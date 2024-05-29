import { Controller, Query, Sse } from '@nestjs/common';
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
    @Query('count') count: number,
    @Query('ticks') ticks: number,
  ): Observable<MessageEvent> {
    console.log(
      'register worldTickerEvent',
      `name:${name} count:${count} ticks:${ticks}`,
    );
    return interval(ticks).pipe(
      tap((value) => {
        this.appEventEmitter.emit('appEvents', { value, name });
      }),
      map(
        (value) =>
          ({
            data: { event: `${name}.raised`, payload: value },
          }) as MessageEvent,
      ),
      takeWhile((eventData) => eventData.data.payload < count),
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
