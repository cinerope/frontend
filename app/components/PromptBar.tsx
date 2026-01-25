'use client'

import React, { useState } from 'react';
import { useReactFlow } from 'reactflow'; // 좌표 계산용 훅 추가
import useStore from "@/app/store/useStore";

/**
 * AI 모델별 파라미터 확장성을 위한 정의 (나중에 별도 JSON 파일로 분리 가능)
 */
const AI_MODELS = {
    'stable-diffusion': { name: 'Stable Diffusion', params: ['Aspect Ratio', 'Steps', 'Seed'] },
    'kling': { name: 'Kling AI', params: ['Camera Lens', 'Shot Size', 'Focus', 'Light'] },
    'runway': { name: 'Runway Gen-3', params: ['Motion', 'Style', 'Quality'] },
};

export default function PromptBar() {
    const { addNode, setPromptMode } = useStore();
    const { screenToFlowPosition } = useReactFlow(); // 화면 좌표를 캔버스 좌표로 변환해주는 도구

    const [selectedAI, setSelectedAI] = useState<keyof typeof AI_MODELS>('stable-diffusion');
    const [prompt, setPrompt] = useState('');

    const handleGenerate = () => {
        if (!prompt.trim()) return;

        // 1. 현재 화면의 정중앙 좌표 계산
        // 사이드바 너비(230px)를 고려하여 작업 영역의 중앙을 잡습니다.
        const centerX = (window.innerWidth + 230) / 2;
        const centerY = window.innerHeight / 2;

        const position = screenToFlowPosition({ x: centerX, y: centerY });

        // 2. 노드 객체 생성
        const newNode = {
            id: `node_${Date.now()}`,
            type: 'promptNode', // 'default'에서 'promptNode'로 변경
            position,
            data: {
                prompt: prompt,
                aiModel: selectedAI,
                params: AI_MODELS[selectedAI].params
            },
        };

        // 3. 스토어에 노드 추가 및 모드 종료
        addNode(newNode);
        setPromptMode(false);
        setPrompt(''); // 입력창 초기화
    };

    return (
        <div className="w-[800px] bg-white border border-gray-200 shadow-2xl rounded-2xl p-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* 상단: 모델 선택 및 닫기 버튼 */}
            <div className="flex justify-between items-center mb-4">
                <select
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedAI}
                    onChange={(e) => setSelectedAI(e.target.value as any)}
                >
                    {Object.entries(AI_MODELS).map(([key, model]) => (
                        <option key={key} value={key}>{model.name}</option>
                    ))}
                </select>

                <button
                    onClick={() => setPromptMode(false)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                >
                    ✕
                </button>
            </div>

            {/* 중간: 동적 파라미터 섹션 (가로 스크롤 가능하게 구성) */}
            <div className="flex gap-3 overflow-x-auto pb-3 mb-3 no-scrollbar">
                {AI_MODELS[selectedAI].params.map((param) => (
                    <div key={param} className="flex-none px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600 border border-transparent hover:border-gray-300 cursor-pointer">
                        {param}: Auto
                    </div>
                ))}
                <button className="flex-none px-3 py-1.5 border border-dashed border-gray-300 rounded-full text-xs text-gray-400 hover:bg-gray-50">
                    + Add Param
                </button>
            </div>

            {/* 하단: 프롬프트 입력 및 전송 */}
            <div className="flex gap-2">
                <textarea
                    rows={1}
                    placeholder={`${AI_MODELS[selectedAI].name}에게 명령을 입력하세요...`}
                    className="flex-1 bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleGenerate();
                        }
                    }}
                />
                <button
                    className="bg-black text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors"
                    onClick={handleGenerate}
                >
                    Generate
                </button>
            </div>
        </div>
    );
}