import { Controller, ParseIntPipe, Query, Sse } from '@nestjs/common';
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

  constructor(private appEventEmitter: EventEmitter2) {
    this.appEventEmitter.on('appEvents', (data) => {
      this.appEventSubject.next(data);
    });
  }

  @Sse('worldTickerEvent')
  worldTickerEvent(
    @Query('name') name: string,
    @Query('start', ParseIntPipe) start: number,
    @Query('count', ParseIntPipe) count: number,
    @Query('ticks', ParseIntPipe) ticks: number,
  ): Observable<MessageEvent> {
    console.log(
      'register worldTickerEvent',
      `name:${name} from:${start} to:${count} ticks:${ticks}`,
    );
    return interval(ticks).pipe(
      tap((value) => {
        this.appEventEmitter.emit('appEvents', { value, name });
      }),
      takeWhile((value) => {
        console.log('value', value, start, count);
        return value < count;
      }),
      map(
        (value) =>
          ({
            data: { event: `${name}.raised`, payload: value + start },
          }) as MessageEvent,
      ),
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
