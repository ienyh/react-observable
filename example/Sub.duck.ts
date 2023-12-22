import { PayloadAction } from '@core/type'
import Base from '@core/Base'
import { reduceFromPayload, createToPayload } from '@core/util'
import { StreamerMethod } from '@decorator/method'
import { Observable } from 'rxjs'
import { filterAction } from '@operator/index'

export class SubDuck extends Base {
  get quickTypes() {
    enum Type {
      RELOAD,
    }
    return {
      ...super.quickTypes,
      ...Type,
    }
  }
  get reducers() {
    const types = this.types
    return {
      data: reduceFromPayload<string>(types.RELOAD, 'data'),
    }
  }
  get creators() {
    const types = this.types
    return {
      ...super.creators,
      setData: createToPayload<string>(types.RELOAD),
    }
  }
  @StreamerMethod()
  data(action$: Observable<PayloadAction<string>>) {
    const duck = this
    const { types, dispatch } = duck
    return action$.pipe(filterAction([types.RELOAD])).subscribe((action) => {
      console.log(action.payload);
    })
  }
}