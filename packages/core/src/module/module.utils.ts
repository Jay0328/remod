interface Displayable {
  displayName?: string;
  name: string;
}

export function getModuleDisplayName(moduleName: string, target: Displayable) {
  const displayName = `${target.displayName || target.name || 'Unknown'}`;
  return `${moduleName}(${displayName})`;
}
