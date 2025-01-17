import * as React from 'react';

import { CredentialManagerViewProps } from './CredentialManager.types';

export default function CredentialManagerView(props: CredentialManagerViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
