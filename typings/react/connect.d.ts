import * as React from 'react';
import { Base, Store } from '@/core';
import { ConnectedProps } from '@/core/type';
export default function connect<TDuck extends Base, OriginProps>(store: Store<TDuck>, Component: React.FunctionComponent<ConnectedProps<TDuck> & OriginProps>): (props: any) => React.JSX.Element;
