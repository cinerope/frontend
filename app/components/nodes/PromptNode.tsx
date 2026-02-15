'use client';

import React from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';

type AgentParam = {
  key: string;
  value: string;
};

type AgentNodeData = {
  aiModelName?: string;
  prompt?: string;
  params?: AgentParam[];
};

export default function PromptNode({ data }: NodeProps<AgentNodeData>) {
  return (
    <div className="w-72 rounded-2xl border border-[#50566f] bg-[#141929] p-4 shadow-[0_12px_28px_rgba(0,0,0,0.45)]">
      <Handle
        type="target"
        position={Position.Left}
        className="h-3 w-3 border-2 border-[#111522] bg-[#7f87ab]"
      />

      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8f98bc]">Agent</span>
        <span className="rounded-full border border-[#49506a] bg-[#1c2236] px-2 py-0.5 text-[10px] text-[#d6dcf5]">
          {data.aiModelName ?? 'Unknown'}
        </span>
      </div>

      <p className="mb-3 line-clamp-3 text-sm text-[#dfe5ff]">{data.prompt || '프롬프트가 없습니다.'}</p>

      <div className="flex flex-wrap gap-1.5">
        {data.params?.map((param) => (
          <span
            key={param.key}
            className="rounded-md border border-[#3f455c] bg-[#1a2032] px-2 py-1 text-[10px] text-[#acb5d7]"
          >
            {param.key}: {param.value}
          </span>
        ))}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="h-3 w-3 border-2 border-[#111522] bg-[#98a3ce]"
      />
    </div>
  );
}
