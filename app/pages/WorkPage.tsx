'use client';

import { useState, type MouseEvent } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import SideBar from '@/app/components/SideBar';
import TaskBar from '@/app/components/TaskBar';
import PromptBar from '@/app/components/PromptBar';
import PromptNode from '@/app/components/nodes/PromptNode';
import ImageNode from '@/app/components/nodes/ImageNode';
import VideoNode from '@/app/components/nodes/VideoNode';
import CommentNode from '@/app/components/nodes/CommentNode';
import useStore from '@/app/store/useStore';
import { createNodeId } from '@/app/lib/nodeId';

const nodeTypes = {
  promptNode: PromptNode,
  imageNode: ImageNode,
  videoNode: VideoNode,
  commentNode: CommentNode,
};

function WorkCanvas() {
  const {
    nodes,
    edges,
    uiMode,
    setUiMode,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore();
  const { screenToFlowPosition } = useReactFlow();
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const handlePaneClick = (event: MouseEvent) => {
    if (uiMode !== 'comment-place') {
      return;
    }

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    addNode({
      id: createNodeId('comment'),
      type: 'commentNode',
      position,
      data: {
        text: '',
        editing: true,
      },
    });

    setUiMode('none');
  };

  return (
    <div className="flex h-screen bg-[#090c15] text-[#e8ecff]">
      <aside className="h-full w-[240px] shrink-0 border-r border-[#252b3f]">
        <SideBar />
      </aside>

      <main className="relative flex-1 cinerope-grid">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onPaneClick={handlePaneClick}
          onPaneMouseMove={(event) => {
            if (uiMode === 'comment-place') {
              setCursor({ x: event.clientX, y: event.clientY });
            }
          }}
          nodeTypes={nodeTypes}
          fitView
          defaultEdgeOptions={{
            style: {
              stroke: '#6e7387',
              strokeDasharray: '6 5',
              strokeWidth: 2,
            },
          }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1.2} color="#2f3550" />
          <Controls
            style={{
              background: '#11172a',
              borderColor: '#3a435f',
              color: '#cdd5f3',
            }}
            showInteractive={false}
          />
        </ReactFlow>

        {uiMode === 'comment-place' && (
          <div
            className="pointer-events-none fixed z-20"
            style={{
              left: cursor.x + 8,
              top: cursor.y + 8,
            }}
          >
            <div className="rounded-full border border-[#9f8a56] bg-[#6f5d36]/50 px-2 py-1 text-xs text-[#f6e2b7] shadow-[0_4px_12px_rgba(0,0,0,0.45)]">
              Comment
            </div>
          </div>
        )}

        <section className="pointer-events-none absolute bottom-10 left-0 right-0 z-10 flex justify-center">
          <div className="pointer-events-auto">
            {uiMode === 'agent-form' ? <PromptBar /> : <TaskBar />}
          </div>
        </section>
      </main>
    </div>
  );
}

export default function WorkPage() {
  return (
    <ReactFlowProvider>
      <WorkCanvas />
    </ReactFlowProvider>
  );
}
