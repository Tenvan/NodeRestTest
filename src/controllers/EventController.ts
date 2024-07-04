import { Controller, Logger, ParseIntPipe, Query, Sse } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';
import {
  Observable,
  Subject,
  fromEvent,
  interval,
  map,
  takeWhile,
  tap,
} from 'rxjs';

@ApiTags('Events')
@Controller('events')
export class EventController {
  private appEventSubject = new Subject<any>();

  // 1. Injizieren Sie den Logger-Service
  private logger = new Logger(EventController.name);

  constructor(private appEventEmitter: EventEmitter2) {
    this.appEventEmitter.on('appEvents', (data) => {
      this.appEventSubject.next(data);
      this.logger.log(`Event received: ${JSON.stringify(data)}`);
    });
  }

  @Sse('worldTickerEvent')
  worldTickerEvent(
    @Query('name') name: string,
    @Query('start', ParseIntPipe) start: number,
    @Query('count', ParseIntPipe) count: number,
    @Query('ticks', ParseIntPipe) ticks: number,
  ): Observable<MessageEvent> {
    this.logger.log(
      'register worldTickerEvent',
      `name:${name} from:${start} to:${count} ticks:${ticks}`,
    );
    return interval(ticks).pipe(
      takeWhile((value) => {
        this.logger.log('value', value, start, count);
        return value < count;
      }),
      map(
        (value) =>
          ({
            data: { event: `${name}.raised`, payload: value + start },
          }) as MessageEvent,
      ),
      tap((value) => {
        this.appEventEmitter.emit('appEvents', { value, name });
      }),
    );
  }

  @Sse('appEventsEndpoint')
  appEvents(): Observable<any> {
    return fromEvent(this.appEventEmitter, 'appEvents').pipe(
      map((data) => {
        return {
          data: { event: 'appEvents.raised', payload: data },
        } as MessageEvent;
      }),
    );
  }
}
