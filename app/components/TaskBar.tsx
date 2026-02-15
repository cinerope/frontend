'use client';

import { useReactFlow } from 'reactflow';
import useStore from '@/app/store/useStore';
import { createNodeId } from '@/app/lib/nodeId';

const CREATE_ITEMS = [
  { key: 'agent', label: 'Agent 노드', actionLabel: 'A' },
  { key: 'image', label: '이미지 노드', actionLabel: 'I' },
  { key: 'video', label: '영상 노드', actionLabel: 'V' },
] as const;

export default function TaskBar() {
  const { uiMode, setUiMode, addNode } = useStore();
  const { screenToFlowPosition } = useReactFlow();

  const isNodeMenuOpen = uiMode === 'node-menu';
  const isCommentMode = uiMode === 'comment-place';

  const createMediaNode = (mediaType: 'image' | 'video') => {
    const position = screenToFlowPosition({
      x: (window.innerWidth + 240) / 2,
      y: window.innerHeight / 2,
    });

    addNode({
      id: createNodeId(mediaType),
      type: mediaType === 'image' ? 'imageNode' : 'videoNode',
      position,
      data: {
        mediaType,
        generated: false,
        detailsOpen: false,
        resultUrl: null,
        usedAgent: null,
      },
    });

    setUiMode('none');
  };

  const handleCreateClick = () => {
    setUiMode(isNodeMenuOpen ? 'none' : 'node-menu');
  };

  const handleCommentClick = () => {
    setUiMode(isCommentMode ? 'none' : 'comment-place');
  };

  const handleMenuAction = (key: (typeof CREATE_ITEMS)[number]['key']) => {
    if (key === 'agent') {
      setUiMode('agent-form');
      return;
    }

    if (key === 'image') {
      createMediaNode('image');
      return;
    }

    createMediaNode('video');
  };

  return (
    <div className="relative flex flex-col items-center gap-3">
      <div
        className={[
          'pointer-events-none absolute bottom-full mb-3 flex gap-3 transition-all duration-300',
          isNodeMenuOpen
            ? 'translate-y-0 opacity-100'
            : 'translate-y-2 opacity-0',
        ].join(' ')}
      >
        {CREATE_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => handleMenuAction(item.key)}
            className="pointer-events-auto group flex h-14 w-14 flex-col items-center justify-center rounded-full border border-[#464b61] bg-[#1b1f2d]/95 text-xs text-[#d5d9ea] shadow-[0_0_0_1px_rgba(141,151,181,0.12),0_10px_24px_rgba(0,0,0,0.45)] transition hover:-translate-y-0.5 hover:border-[#7b82a1]"
            aria-label={item.label}
            title={item.label}
          >
            <span className="text-[13px] font-semibold tracking-[0.22em] text-[#8e96ba]">{item.actionLabel}</span>
            <span className="mt-0.5 text-[10px] text-[#9ca4c5]">{item.label.replace(' 노드', '')}</span>
          </button>
        ))}
      </div>

      <nav className="flex items-center gap-2 rounded-2xl border border-[#42485f] bg-[#121522]/95 px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
        <button
          onClick={handleCreateClick}
          className={[
            'rounded-xl border px-4 py-2 text-sm font-medium transition',
            isNodeMenuOpen
              ? 'border-[#7982a5] bg-[#242c44] text-[#eff3ff]'
              : 'border-[#343a4f] bg-[#191d2d] text-[#b8bfd9] hover:border-[#4f5672] hover:text-[#dde2f5]',
          ].join(' ')}
        >
          노드생성
        </button>

        <div className="h-6 w-px bg-[#2d3347]" />

        <button
          onClick={handleCommentClick}
          className={[
            'rounded-xl border px-4 py-2 text-sm font-medium transition',
            isCommentMode
              ? 'border-[#7982a5] bg-[#242c44] text-[#eff3ff]'
              : 'border-[#343a4f] bg-[#191d2d] text-[#b8bfd9] hover:border-[#4f5672] hover:text-[#dde2f5]',
          ].join(' ')}
        >
          코멘트
        </button>
      </nav>
    </div>
  );
}
