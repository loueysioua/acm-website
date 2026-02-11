import { Asset, Entry, EntrySkeletonType, UnresolvedLink } from "contentful";

export function isResolvedEntry<T extends EntrySkeletonType>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entry: any,
): entry is Entry<T, undefined, string> {
  return !!entry && typeof entry === "object" && "fields" in entry;
}

export function getAssetUrl(
  asset: Asset | UnresolvedLink<"Asset"> | undefined | null,
): string | null {
  // 1. Safety check: If asset is missing or not resolved (no fields), return null
  if (!asset || !("fields" in asset) || !asset.fields.file) {
    return null;
  }

  const file = asset.fields.file;

  if (typeof file === "string") {
    return (file as string).startsWith("//") ? `https:${file}` : file;
  }

  // 3. Standard Case: 'file' is an object with a 'url' property
  if ("url" in file && typeof file.url === "string") {
    const url = file.url;
    return url.startsWith("//") ? `https:${url}` : url;
  }

  // 4. Fallback if structure is unexpected
  return null;
}

export function getAssetTitle(
  asset: Asset | UnresolvedLink<"Asset"> | undefined | null,
): string {
  if (!asset || !("fields" in asset)) return "";
  return (asset.fields.title || asset.fields.description || "") as string;
}

export function getAssetDescription(
  asset: Asset | UnresolvedLink<"Asset"> | undefined | null,
): string {
  if (!asset || !("fields" in asset)) return "";
  return (asset.fields.description || "") as string;
}

export const fetchFirst = async <T>(promise: Promise<{ items: T[] }>) => {
  const response = await promise;
  return response.items[0] || null;
};

export const fetchAll = async <T>(promise: Promise<{ items: T[] }>) => {
  const response = await promise;
  return response.items || [];
};
