import * as React from 'react';
import { Store } from '@/core';
import type { ConnectedProps } from '@/core/type';
export default function connect<TStore extends Store, Props>(store: TStore, Component: React.FunctionComponent<Props>): React.FunctionComponent<Omit<Props, keyof ConnectedProps<TStore['duck']>>>;
