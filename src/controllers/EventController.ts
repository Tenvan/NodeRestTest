import { Controller, Logger, ParseIntPipe, Query, Sse } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';
import {
  Observable,
  Subject,
  finalize,
  fromEvent,
  interval,
  map,
  takeWhile,
  tap,
} from 'rxjs';

@ApiTags('Events')
@Controller('events')
export class EventController {
  // #region Properties (2)

  private appEventSubject = new Subject<any>();
  // 1. Injizieren Sie den Logger-Service
  private logger = new Logger(EventController.name);

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor(private appEventEmitter: EventEmitter2) {
    this.appEventEmitter.on('appEvents', (data) => {
      this.appEventSubject.next(data);
      this.logger.debug(
        `Event received: ${data?.value?.data?.event} => ${data?.value?.data?.payload}`,
      );
    });
  }

  // #endregion Constructors (1)

  // #region Public Methods (2)

  @Sse('appEventsEndpoint')
  public appEvents(): Observable<any> {
    return fromEvent(this.appEventEmitter, 'appEvents').pipe(
      map((data) => {
        return {
          data: { event: 'appEvents.raised', payload: data },
        } as MessageEvent;
      }),
    );
  }

  @Sse('worldTickerEvent')
  public worldTickerEvent(
    @Query('name') name: string,
    @Query('start', ParseIntPipe) start: number,
    @Query('count', ParseIntPipe) count: number,
    @Query('ticks', ParseIntPipe) ticks: number,
  ): Observable<MessageEvent> {
    this.logger.warn(
      `start worldTicker: ${name} | ${start} | ${count} | ${ticks}`,
    );
    return interval(ticks).pipe(
      takeWhile((value) => value < count),
      map(
        (value) =>
          ({
            data: { event: `${name}.raised`, payload: value + start },
          }) as MessageEvent,
      ),
      tap((value) => {
        this.appEventEmitter.emit('appEvents', { value, name });
      }),
      finalize(() => {
        // Führen Sie hier Ihre Abschlussaktionen durch
        this.logger.warn(
          `finished worldTicker: ${name} | ${start} | ${count} | ${ticks}`,
        );
      }),
    );
  }

  // #endregion Public Methods (2)
}
