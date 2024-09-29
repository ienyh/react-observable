import * as React from 'react';
import { Base, Store } from '@/core';
import { ConnectedProps } from '@/core/type';
export default function connect<TDuck extends Base, Props>(store: Store<TDuck>, Component: React.FunctionComponent<Props>): React.FunctionComponent<Omit<Props, keyof ConnectedProps<TDuck>>>;
