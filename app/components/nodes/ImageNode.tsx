'use client';

import React from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import useStore from '@/app/store/useStore';
import { MOCK_IMAGE_URL, MOCK_VIDEO_URL } from '@/app/constants/agentMocks';

type AgentParam = {
  key: string;
  value: string;
};

type AgentSummary = {
  aiModelName?: string;
  prompt?: string;
  params?: AgentParam[];
};

type MediaNodeData = {
  mediaType?: 'image' | 'video';
  generated?: boolean;
  detailsOpen?: boolean;
  resultUrl?: string | null;
  usedAgent?: AgentSummary | null;
};

export default function ImageNode({ id, data }: NodeProps<MediaNodeData>) {
  const { edges, nodes, updateNodeData } = useStore();

  const mediaType = data.mediaType ?? 'image';
  const title = mediaType === 'image' ? '이미지 노드' : '영상 노드';

  const incomingEdge = edges.find((edge) => edge.target === id);
  const linkedAgent = nodes.find(
    (node) => node.id === incomingEdge?.source && node.type === 'promptNode',
  );

  const linkedAgentData = linkedAgent?.data as AgentSummary | undefined;
  const isConnectedToAgent = Boolean(linkedAgentData);

  const handleGenerate = () => {
    if (!linkedAgentData) {
      return;
    }

    updateNodeData(id, {
      generated: true,
      resultUrl: mediaType === 'image' ? MOCK_IMAGE_URL : MOCK_VIDEO_URL,
      usedAgent: {
        aiModelName: linkedAgentData.aiModelName,
        prompt: linkedAgentData.prompt,
        params: linkedAgentData.params,
      },
    });
  };

  const handleToggleDetails = () => {
    updateNodeData(id, {
      detailsOpen: !data.detailsOpen,
    });
  };

  return (
    <div className="w-80 rounded-2xl border border-[#4a5268] bg-[#141a2a] p-3 shadow-[0_14px_28px_rgba(0,0,0,0.46)]">
      <Handle
        type="target"
        position={Position.Left}
        className="h-3 w-3 border-2 border-[#111522] bg-[#7f88aa]"
      />

      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.22em] text-[#8d96b9]">{title}</span>
        {isConnectedToAgent ? (
          <span className="text-[10px] text-[#7fc7a8]">Agent 연결됨</span>
        ) : (
          <span className="text-[10px] text-[#cf9a9a]">Agent 미연결</span>
        )}
      </div>

      <div className="mb-2 aspect-video overflow-hidden rounded-xl border border-dashed border-[#5a627d] bg-[#111625]">
        {data.generated && data.resultUrl ? (
          mediaType === 'image' ? (
            <div
              role="img"
              aria-label="생성된 결과 이미지"
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${data.resultUrl})` }}
            />
          ) : (
            <video
              src={data.resultUrl}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          )
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-xs text-[#98a1c3]">
            Agent 노드 연결 및 {mediaType === 'image' ? '이미지' : '영상'} 생성 버튼을 눌러주세요.
          </div>
        )}
      </div>

      <div className="mb-2 flex items-center justify-between gap-2">
        <button
          onClick={handleGenerate}
          disabled={!isConnectedToAgent}
          className="rounded-lg border border-[#525c79] bg-[#262f4a] px-3 py-1.5 text-xs font-medium text-[#e4e9ff] transition hover:bg-[#2f3a59] disabled:cursor-not-allowed disabled:border-[#3a4054] disabled:bg-[#1c2233] disabled:text-[#6f7797]"
        >
          {mediaType === 'image' ? '이미지 생성' : '영상 생성'}
        </button>

        <button
          onClick={handleToggleDetails}
          className="rounded-lg border border-[#3e445a] bg-[#171d2d] px-3 py-1.5 text-xs text-[#a6aed1] transition hover:border-[#586080] hover:text-[#d1d9fa]"
        >
          {data.detailsOpen ? '상세 닫기' : '상세 보기'}
        </button>
      </div>

      {data.detailsOpen && (
        <div
          className="cinerope-scroll nowheel max-h-32 space-y-2 overflow-y-auto rounded-lg border border-[#3b4258] bg-[#111626] p-2 pr-1 text-xs text-[#aeb7da]"
          onWheel={(event) => event.stopPropagation()}
        >
          <p>
            <span className="text-[#7f88ac]">Agent:</span> {data.usedAgent?.aiModelName ?? '-'}
          </p>
          <p>
            <span className="text-[#7f88ac]">Prompt:</span> {data.usedAgent?.prompt ?? '-'}
          </p>
          <div className="space-y-1">
            <p className="text-[#7f88ac]">Params:</p>
            {(data.usedAgent?.params ?? []).map((param) => (
              <p key={param.key}>
                {param.key}: {param.value}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
