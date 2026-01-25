'use client'

import React from 'react';
import { Handle, Position } from 'reactflow';

export default function PromptNode({ data }: { data: any }) {
    return (
        <div className="px-4 py-3 shadow-md rounded-xl bg-white border-2 border-black w-64">
            <Handle
                type="target"
                position={Position.Left}
                className="w-3 h-3 bg-gray-400 border-2 border-white"
            />

            <div className="flex flex-col">
                {/* 상단: AI 모델 정보 */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    {data.aiModel || 'AI MODEL'}
                  </span>
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        </div>

                        {/* 중단: 프롬프트 텍스트 */}
                        <p className="text-sm font-medium text-gray-800 line-clamp-3 mb-3">
                            {data.prompt}
                        </p>

                        {/* 하단: 파라미터 칩들 */}
                        <div className="flex flex-wrap gap-1">
                            {data.params?.map((param: string) => (
                                <span key={param} className="px-2 py-0.5 bg-gray-100 rounded text-[9px] text-gray-500 border border-gray-200">
                      {param}
                    </span>
                    ))}
                </div>
            </div>

            {/* 오른쪽 연결점 (출력) */}
            <Handle
                type="source"
                position={Position.Right}
                className="w-3 h-3 bg-black border-2 border-white"
            />
        </div>
    );
}