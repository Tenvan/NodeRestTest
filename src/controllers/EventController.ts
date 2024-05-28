import { Controller, Query, Sse } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { interval, map, takeWhile, type Observable } from 'rxjs';

@ApiTags('Events')
@Controller('events')
export class EventController {
  @Sse('worldTicker')
  sse(
    @Query('count') count: number,
    @Query('ticks') ticks: number,
  ): Observable<MessageEvent> {
    return interval(ticks).pipe(
      map(
        (value) =>
          ({ data: { hello: `world: ${value}`, value } }) as MessageEvent,
      ),
      takeWhile((ApiTags) => ApiTags.data.value < count),
    );
  }
}
