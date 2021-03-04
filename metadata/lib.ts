import { AppName, Path, Poke, uxToHex, PatpNoSig } from "../lib";
import { Association, Metadata, MetadataUpdate, MetadataUpdateAdd, MetadataUpdateRemove } from './types';

export const metadataAction = <T extends MetadataUpdate>(data: T): Poke<T> => ({
  app: 'metadata-push-hook',
  mark: 'metadata-update',
  json: data
});

export const add = (
  ship: PatpNoSig,
  appName: AppName,
  resource: Path,
  group: Path,
  title: string,
  description: string,
  dateCreated: string,
  color: string,
  moduleName: string,
): Poke<MetadataUpdateAdd> => metadataAction({
  add: {
    group,
    resource: {
      resource,
      app: appName
    },
    metadata: {
      title,
      description,
      color,
      'date-created': dateCreated,
      creator: `~${ship}`,
      'module': moduleName,
      picture: '',
      preview: false,
      vip: ''
    }
  }
});

export { add as metadataAdd };

export const remove = (
  appName: AppName,
  resource: string,
  group: string
): Poke<MetadataUpdateRemove> => metadataAction({
  remove: {
    group,
    resource: {
      resource,
      app: appName
    }
  }
});

export { remove as metadataRemove };

export const update = (
  association: Association,
  newMetadata: Partial<Metadata>
): Poke<MetadataUpdateAdd> => {
  const metadata = { ...association.metadata, ...newMetadata };
    metadata.color = uxToHex(metadata.color);
    return metadataAction({
      add: {
        group: association.group,
        resource: {
          resource: association.resource,
          app: association.app
        },
        metadata
      }
    });
}

export { update as metadataUpdate };