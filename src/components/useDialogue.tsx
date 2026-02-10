import { useCallback, useMemo, useState } from "react";
import type { Node } from "./valentineScene";

export function useDialogue(scene: Record<string, Node>, startId: string) {
	const [nodeId, setNodeId] = useState(startId);
	const [flags, setFlags] = useState<Record<string, boolean>>({});

	const node = useMemo(() => scene[nodeId], [scene, nodeId]);

	const applyFlags = useCallback((nextFlags?: Record<string, boolean>) => {
		if (!nextFlags) return;
		setFlags((prev) => ({ ...prev, ...nextFlags }));
	}, []);

	const next = useCallback(() => {
		const current = scene[nodeId];
		if (current.type !== "line") return;
		applyFlags(current.setFlags);
		if (current.next) setNodeId(current.next);
	}, [applyFlags, nodeId, scene]);

	const choose = useCallback(
		(index: number) => {
			const current = scene[nodeId];
			if (current.type !== "choice") return;

			const picked = current.choices[index];
			applyFlags(picked.setFlags);
			setNodeId(picked.next);
		},
		[applyFlags, nodeId, scene],
	);

	const reset = useCallback(() => {
		setNodeId(startId);
		setFlags({});
	}, [startId]);

	return { node, flags, next, choose, reset };
}
