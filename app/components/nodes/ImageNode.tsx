'use client'

import React from 'react';
import { Handle, Position } from 'reactflow';

export default function ImageNode({ data }: { data: any }) {
    return (
        <div className="p-2 shadow-lg rounded-2xl bg-white border border-gray-200 w-72">
            {/* 왼쪽 입력 핸들: 프롬프트 신호 수신 */}
            <Handle
                type="target"
                position={Position.Left}
                className="w-3 h-3 bg-blue-500 border-2 border-white"
            />

            {/* 이미지 영역: 데이터가 없으면 플레이스홀더 표시 */}
            <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center border border-dashed border-gray-300 mb-2">
                {data.imageUrl ? (
                    <img src={data.imageUrl} alt="AI Result" className="w-full h-full object-cover" />
                ) : (
                    <div className="text-center">
                        <p className="text-[10px] text-gray-400 font-medium tracking-tight">WAITING FOR SIGNAL</p>
                    </div>
                )}
            </div>

            <div className="px-1 flex justify-between items-center">
                <span className="text-[10px] font-bold text-gray-500 italic">RESULT_NODE</span>
                {data.imageUrl && (
                    <button className="text-[10px] bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors font-bold">
                        DOWNLOAD
                    </button>
                )}
            </div>

            {/* 왼쪽 연결점 (입력) */}
            <Handle
                type="target"
                position={Position.Left}
                className="w-3 h-3 bg-blue-500 border-2 border-white"
            />
        </div>
    );
}