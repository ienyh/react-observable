import * as React from 'react';
import { Base, Store } from '@/core';
import { ConnectedProps } from '@/core/type';
export default function connect<TDuck extends Base, Props>(store: Store<TDuck>, Component: React.FunctionComponent<Props>): (props: Props extends ConnectedProps<TDuck> ? Omit<Props, keyof ConnectedProps<TDuck>> : never) => React.JSX.Element;
