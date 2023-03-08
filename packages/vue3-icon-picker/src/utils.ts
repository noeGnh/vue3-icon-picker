export function useDetectOutsideClick(
	component: any,
	callback: ((...args: any[]) => void) | (() => void)
) {
	if (!component) return
	const listener = (event: any) => {
		if (
			event.target !== component.value &&
			event.composedPath().includes(component.value)
		) {
			return
		}
		if (typeof callback === 'function') {
			callback()
		}
	}
	onMounted(() => {
		// @ts-ignore
		window.addEventListener('click', listener)
	})
	onBeforeUnmount(() => {
		// @ts-ignore
		window.removeEventListener('click', listener)
	})

	return { listener }
}
