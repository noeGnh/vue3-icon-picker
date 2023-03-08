export function extractFileName(path: string): string {
	const componentName = path.replace(/^\.\/(.*)\.\w+$/, '$1')
	const parts = componentName.split('/')

	return parts[parts.length - 1]?.split('.')[0] || ''
}
