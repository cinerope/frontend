'use client'

import useStore from "@/app/store/useStore";
import { useReactFlow } from 'reactflow';

export default function TaskBar() {
    const { setPromptMode } = useStore();

    const { addNode } = useStore();
    const { screenToFlowPosition } = useReactFlow();

    const handleAddImageNode = () => {
        const position = screenToFlowPosition({
            x: window.innerWidth / 2 + 100, // 프롬프트 노드보다 약간 오른쪽에 생성되도록 설정
            y: window.innerHeight / 2
        });

        addNode({
            id: `img_${Date.now()}`,
            type: 'imageNode',
            position,
            data: { imageUrl: null }
        });
    };

    const tools = [
        { name: '커서', group: 1, action: () => console.log('Cursor mode') },
        { name: 'divider', group: 0 },
        { name: '노드생성', group: 2, action: () => setPromptMode(true) }, // 클릭 시 모드 전환
        { name: '와이어생성', group: 2, action: () => console.log('Wire mode') },
        { name: 'divider', group: 0 },
        { name: '이미지노드', group: 3, action: handleAddImageNode },
        { name: '영상노드', group: 3, action: () => console.log('Video node') },
        { name: 'divider', group: 0 },
        { name: '코멘트', group: 4 },
        { name: '펜슬', group: 4 },
    ];

    return (
        <nav className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 shadow-xl rounded-xl">
            {tools.map((tool, index) => {
                if (tool.name === 'divider') {
                    return <div key={`div-${index}`} className="w-[1px] h-6 bg-gray-200 mx-1" />;
                }
                return (
                    <button
                        key={tool.name}
                        onClick={tool.action}
                        className="px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap"
                    >
                        {tool.name}
                    </button>
                );
            })}
        </nav>
    )
}