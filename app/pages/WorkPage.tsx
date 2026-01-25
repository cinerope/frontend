'use client'

import SideBar from "@/app/components/SideBar";
import TaskBar from "@/app/components/TaskBar";
import PromptBar from "@/app/components/PromptBar";
import PromptNode from "@/app/components/nodes/PromptNode";
import ImageNode from "@/app/components/nodes/ImageNode";

import ReactFlow, { Background, Controls, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css'; // 기본 스타일 임포트 필수!
import useStore from "@/app/store/useStore";

// 노드 타입 정의 (컴포넌트와 매핑)
const nodeTypes = {
    promptNode: PromptNode,
    imageNode: ImageNode,
};

export default function WorkPage() {
    // Store에서 상태와 함수들을 가져옵니다.
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, isPromptMode } = useStore();

    return (
        // useReactFlow 기능을 쓰기 위해 최상단을 감싸줍니다.
        <ReactFlowProvider>
            <div className={'flex h-screen '}>
                <aside className={'h-full '}>
                    <SideBar></SideBar>
                </aside>

                <main className={'relative flex-1 bg-white'}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
                        fitView // 초기 로드 시 모든 노드가 보이도록 맞춤
                    >
                        {/* 피그마 같은 점무늬 배경 */}
                        <Background variant={"dots" as any} gap={20} size={1} />
                        {/* 좌측 하단 줌 컨트롤 도구 */}
                        <Controls />
                    </ReactFlow>

                    <section className="absolute bottom-10 left-0 right-0 z-10 flex justify-center pointer-events-none">
                        <div className="pointer-events-auto">
                            {/* isPromptMode 상태에 따라 TaskBar 또는 PromptBar 렌더링 */}
                            {isPromptMode ? <PromptBar /> : <TaskBar />}
                        </div>
                    </section>

                </main>
            </div>
        </ReactFlowProvider>
    )
}