'use client';

import React, { useMemo, useState } from 'react';
import { useReactFlow } from 'reactflow';
import useStore from '@/app/store/useStore';
import {
  AI_AGENTS,
  DEFAULT_AGENT,
  IMAGE_AGENT_KEYS,
  PARAM_LIBRARY,
  VIDEO_AGENT_KEYS,
  createDefaultParamValues,
  type AgentKey,
} from '@/app/constants/agentMocks';
import { createNodeId } from '@/app/lib/nodeId';

export default function PromptBar() {
  const { addNode, setUiMode } = useStore();
  const { screenToFlowPosition } = useReactFlow();

  const [agentMode, setAgentMode] = useState<'image' | 'video'>('image');
  const [selectedAgent, setSelectedAgent] = useState<AgentKey>(DEFAULT_AGENT);
  const [prompt, setPrompt] = useState('');
  const [paramValues, setParamValues] = useState<Record<string, string>>(
    createDefaultParamValues(DEFAULT_AGENT),
  );
  const [openParamKey, setOpenParamKey] = useState<string | null>(null);

  const selectedAgentConfig = AI_AGENTS[selectedAgent];
  const selectedParams = useMemo(
    () => selectedAgentConfig.parameterKeys.map((paramKey) => PARAM_LIBRARY[paramKey]).filter(Boolean),
    [selectedAgentConfig.parameterKeys],
  );

  const visibleAgents = agentMode === 'image' ? IMAGE_AGENT_KEYS : VIDEO_AGENT_KEYS;

  const setParamValue = (key: string, value: string) => {
    setParamValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const selectAgent = (agentKey: AgentKey) => {
    setSelectedAgent(agentKey);
    setParamValues(createDefaultParamValues(agentKey));
    setOpenParamKey(null);
  };

  const switchMode = (mode: 'image' | 'video') => {
    setAgentMode(mode);
    const fallback = mode === 'image' ? IMAGE_AGENT_KEYS[0] : VIDEO_AGENT_KEYS[0];
    if (fallback) {
      selectAgent(fallback);
    }
  };

  const updateLensByStep = (paramKey: string, direction: 1 | -1) => {
    const param = PARAM_LIBRARY[paramKey];
    const currentIndex = Math.max(0, param.options.indexOf(paramValues[paramKey] ?? ''));
    const nextIndex = Math.min(param.options.length - 1, Math.max(0, currentIndex + direction));
    setParamValue(paramKey, param.options[nextIndex]);
  };

  const handleGenerate = () => {
    if (!prompt.trim()) {
      return;
    }

    const position = screenToFlowPosition({
      x: (window.innerWidth + 240) / 2,
      y: window.innerHeight / 2,
    });

    addNode({
      id: createNodeId('agent'),
      type: 'promptNode',
      position,
      data: {
        kind: 'agent',
        generated: true,
        aiModel: selectedAgent,
        aiModelName: selectedAgentConfig.name,
        prompt,
        mode: selectedAgentConfig.mode,
        guideUrl: selectedAgentConfig.guideUrl,
        params: selectedAgentConfig.parameterKeys.map((paramKey) => ({
          key: PARAM_LIBRARY[paramKey].label,
          value: paramValues[paramKey] ?? 'Auto',
        })),
      },
    });

    setUiMode('none');
  };

  return (
    <div className="relative w-[980px] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="pointer-events-auto rounded-2xl border border-[#40465c] bg-[#0f1321]/95 p-3 shadow-[0_24px_40px_rgba(0,0,0,0.55)] backdrop-blur">
        <div className="flex gap-2">
          <textarea
            rows={2}
            placeholder={`${selectedAgentConfig.name}에 프롬프트를 입력하세요`}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleGenerate();
              }
            }}
            className="nowheel flex-1 rounded-xl border border-[#3a4056] bg-[#15192a] p-3 text-sm text-[#e6ebff] outline-none focus:border-[#6d7697]"
            onWheel={(event) => event.stopPropagation()}
          />
          <button
            onClick={handleGenerate}
            className="rounded-xl border border-[#6a7394] bg-[#2a324c] px-6 py-2 text-sm font-semibold text-[#eef2ff] transition hover:bg-[#313b59]"
          >
            Generate
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-full left-0 right-0 mb-2 flex items-start gap-3">
        <div className="cinerope-scroll pointer-events-auto flex flex-1 flex-nowrap items-center gap-3 overflow-x-auto pr-2">
          {selectedParams.map((param) => {
            const isOpen = openParamKey === param.key;
            const currentValue = paramValues[param.key] ?? 'Auto';

            return (
              <div key={param.key} className="relative">
                <button
                  onClick={() => setOpenParamKey(isOpen ? null : param.key)}
                  className={[
                    'whitespace-nowrap text-xs transition',
                    isOpen ? 'font-semibold text-[#eef2ff]' : 'text-[#b4bddf] hover:text-[#e3e9ff]',
                  ].join(' ')}
                >
                  <span className="mr-1 text-[#8f98bd]">{param.icon}</span>
                  {param.label}
                  <span className="ml-1 text-[#f1f4ff]">{currentValue}</span>
                </button>

                {isOpen && (
                  <div
                    className="absolute bottom-full left-0 z-20 mb-2 min-w-[220px] rounded-xl border border-[#47506c] bg-[#13192b] p-2 shadow-[0_14px_28px_rgba(0,0,0,0.5)]"
                    onWheel={(event) => event.stopPropagation()}
                  >
                    {param.type === 'lens-dial' ? (
                      <div
                        className="space-y-2 text-xs text-[#b5bee0]"
                        onWheel={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          updateLensByStep(param.key, event.deltaY > 0 ? 1 : -1);
                        }}
                      >
                        <p className="text-[11px] tracking-[0.16em] text-[#8290b9]">LENS DIAL</p>
                        <div className="flex items-center justify-between rounded-lg border border-[#3f4660] bg-[#101628] px-2 py-1.5">
                          <button
                            onClick={() => updateLensByStep(param.key, -1)}
                            className="rounded-md border border-[#4f5772] px-2 py-1 hover:bg-[#1f2740]"
                          >
                            -
                          </button>
                          <span className="text-sm font-semibold text-[#eff3ff]">{currentValue}</span>
                          <button
                            onClick={() => updateLensByStep(param.key, 1)}
                            className="rounded-md border border-[#4f5772] px-2 py-1 hover:bg-[#1f2740]"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="cinerope-scroll max-h-44 space-y-1 overflow-y-auto pr-1" onWheel={(event) => event.stopPropagation()}>
                        {param.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => {
                              setParamValue(param.key, option);
                              setOpenParamKey(null);
                            }}
                            className={[
                              'w-full rounded-md border px-2 py-1.5 text-left text-xs transition',
                              currentValue === option
                                ? 'border-[#7a83a7] bg-[#24304d] text-[#eef2ff]'
                                : 'border-[#353c53] bg-[#161d30] text-[#b6c0e3] hover:border-[#566082] hover:text-[#e7ecff]',
                            ].join(' ')}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setUiMode('none')}
          className="pointer-events-auto ml-1 shrink-0 text-sm font-semibold text-[#9ea6c5] transition hover:text-[#d5dbf1]"
        >
          X
        </button>
      </div>

      <div className="pointer-events-none absolute top-full left-0 right-0 mt-2 flex items-center gap-3 text-sm">
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => switchMode('image')}
            className={[
              'transition',
              agentMode === 'image' ? 'text-base font-bold text-[#f0f3ff]' : 'text-[#99a3c8] hover:text-[#dce2f8]',
            ].join(' ')}
          >
            IMAGE
          </button>
          <button
            onClick={() => switchMode('video')}
            className={[
              'transition',
              agentMode === 'video' ? 'text-base font-bold text-[#f0f3ff]' : 'text-[#99a3c8] hover:text-[#dce2f8]',
            ].join(' ')}
          >
            VIDEO
          </button>
        </div>

        <div className="pointer-events-auto flex flex-wrap items-center gap-x-3 gap-y-1">
          {visibleAgents.map((agentKey) => {
            const selected = selectedAgent === agentKey;
            return (
              <button
                key={agentKey}
                onClick={() => selectAgent(agentKey)}
                className={[
                  'transition',
                  selected ? 'text-base font-bold text-[#f1f4ff]' : 'text-xs text-[#95a0c7] hover:text-[#dce2f8]',
                ].join(' ')}
              >
                {AI_AGENTS[agentKey].name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
