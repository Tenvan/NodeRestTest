import {
  Controller,
  Logger,
  ParseIntPipe,
  Query,
  Res,
  Sse,
  type OnModuleDestroy,
  type OnModuleInit,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';
import type { ServerResponse } from 'http';
import {
  Observable,
  ReplaySubject,
  Subject,
  finalize,
  fromEvent,
  interval,
  map,
  takeWhile,
  tap,
} from 'rxjs';
import { FastifyReply } from 'fastify';

@ApiTags('Events')
@Controller('events')
export class EventController implements OnModuleInit, OnModuleDestroy {
  // #region Properties (5)

  private appEventSubject = new Subject<any>();
  private id = 0;
  // 1. Injizieren Sie den Logger-Service
  private logger = new Logger(EventController.name);
  private stream: {
    id: string;
    subject: ReplaySubject<unknown>;
    observer: Observable<unknown>;
  }[] = [];
  private timer: NodeJS.Timeout | undefined;

  // #endregion Properties (5)

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

  // #region Public Methods (5)

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

  @Sse('sseTicker')
  public sseTicker(@Res() response: FastifyReply): Observable<MessageEvent> {
    this.logger.warn(`start sseTicker`);

    const id = EventController.genStreamId();
    // Clean up the stream when the client disconnects
    response.raw.on('close', () => {
      this.logger.warn(`finished sseTicker`);

      return this.removeStream(id);
    });
    // Create a new stream
    const subject = new ReplaySubject();
    const observer = subject.asObservable();
    this.addStream(subject, observer, id);

    return observer.pipe(
      map(
        (data) =>
          ({
            id: `my-stream-id:${id}`,
            data: `Hello world ${data}`,
            event: 'my-event-name',
          }) as unknown as MessageEvent,
      ),
      tap((value) => {
        this.appEventEmitter.emit('sseTicker', { value, name });
      }),
    );
  }

  @Sse('worldTickerEvent')
  public worldTickerEvent(
    @Res() response: FastifyReply,
    @Query('name') name: string,
    @Query('start', ParseIntPipe) start: number,
    @Query('count', ParseIntPipe) count: number,
    @Query('ticks', ParseIntPipe) ticks: number,
  ): Observable<MessageEvent> {
    this.logger.warn(
      `start worldTicker: ${name} | ${start} | ${count} | ${ticks}`,
    );

    const id = EventController.genStreamId();
    // Clean up the stream when the client disconnects
    response.raw.on('close', () => this.removeStream(id));
    // Create a new stream
    const subject = new ReplaySubject();
    const observer = subject.asObservable();
    this.addStream(subject, observer, id);

    return interval(ticks).pipe(
      takeWhile((value) => value < count),
      map(
        (value) =>
          ({
            data: { event: `${name}.raised`, payload: value + start },
          }) as MessageEvent,
      ),
      tap((value) => {
        this.appEventEmitter.emit('worldTicker', { value, name });
      }),
      finalize(() => {
        // Führen Sie hier Ihre Abschlussaktionen durch
        this.logger.warn(
          `finished worldTicker: ${name} | ${start} | ${count} | ${ticks}`,
        );
      }),
    );
  }

  public onModuleDestroy() {
    clearInterval(this.timer);
  }

  public onModuleInit() {
    this.timer = setInterval(() => {
      this.id += 1;
      this.stream.forEach(({ subject }) => subject.next(this.id));
    }, 1000);
  }

  // #endregion Public Methods (5)

  // #region Private Static Methods (1)

  private static genStreamId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  // #endregion Private Static Methods (1)

  // #region Private Methods (2)

  private addStream(
    subject: ReplaySubject<unknown>,
    observer: Observable<unknown>,
    id: string,
  ): void {
    this.stream.push({
      id,
      subject,
      observer,
    });
  }

  private removeStream(id: string): void {
    this.stream = this.stream.filter((stream) => stream.id !== id);
  }

  // #endregion Private Methods (2)
}
