import { requireNativeView } from 'expo';
import * as React from 'react';

import { CredentialManagerViewProps } from './CredentialManager.types';

const NativeView: React.ComponentType<CredentialManagerViewProps> =
  requireNativeView('CredentialManager');

export default function CredentialManagerView(props: CredentialManagerViewProps) {
  return <NativeView {...props} />;
}
