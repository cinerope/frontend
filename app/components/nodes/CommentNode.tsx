'use client';

import React, { useState } from 'react';
import { type NodeProps } from 'reactflow';
import useStore from '@/app/store/useStore';

type CommentNodeData = {
  text?: string;
  editing?: boolean;
};

export default function CommentNode({ id, data }: NodeProps<CommentNodeData>) {
  const { updateNodeData } = useStore();
  const [draft, setDraft] = useState(data.text ?? '');

  const commit = () => {
    updateNodeData(id, {
      text: draft.trim(),
      editing: false,
    });
  };

  if (data.editing) {
    return (
      <div className="w-64 rounded-xl border border-[#5b4e31] bg-[#2a2214] p-3 shadow-[0_10px_18px_rgba(0,0,0,0.45)]">
        <textarea
          autoFocus
          rows={3}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              commit();
            }
          }}
          className="w-full resize-none rounded-lg border border-[#6d5f40] bg-[#20190f] p-2 text-sm text-[#f3e8cf] outline-none focus:border-[#ae9b67]"
          placeholder="코멘트를 입력하세요"
        />
        <p className="mt-2 text-[11px] text-[#9b8d67]">엔터로 완료</p>
      </div>
    );
  }

  return (
    <button
      onDoubleClick={() =>
        updateNodeData(id, {
          editing: true,
        })
      }
      className="max-w-64 rounded-xl border border-[#645738] bg-[#2c2415] px-3 py-2 text-left text-sm text-[#f0dfbc] shadow-[0_8px_16px_rgba(0,0,0,0.42)]"
      title="더블클릭으로 수정"
    >
      <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[#b59e6b]">Comment</p>
      <p className="whitespace-pre-wrap break-words">{data.text || '코멘트가 비어있습니다.'}</p>
    </button>
  );
}
