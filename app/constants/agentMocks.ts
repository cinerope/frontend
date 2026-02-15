export type GenerationMode = 'image' | 'video';

export type AgentKey =
  | 'nano-banana-pro'
  | 'gpt-image-1-5'
  | 'seedream-4-5'
  | 'flux-2-pro'
  | 'kling-o1-image'
  | 'veo-3-1'
  | 'kling-o1-video'
  | 'wan-2-6'
  | 'seedance-1-5-pro'
  | 'sora-2'
  | 'hailuo-02';

export type ParamType = 'select' | 'lens-dial';

export type ParamDefinition = {
  key: string;
  label: string;
  icon: string;
  type: ParamType;
  options: string[];
};

export type AgentConfig = {
  name: string;
  mode: GenerationMode;
  guideUrl: string;
  parameterKeys: string[];
};

export const PARAM_LIBRARY: Record<string, ParamDefinition> = {
  style: {
    key: 'style',
    label: 'Style',
    icon: '◇',
    type: 'select',
    options: ['2D', '3D', 'real'],
  },
  aspectRatio: {
    key: 'aspectRatio',
    label: 'Aspect ratio',
    icon: '▦',
    type: 'select',
    options: ['1:1', '4:3', '16:9', '21:9', '5:4', '3:2', '2:3', '9:16', '3:4', '4:5'],
  },
  shotSize: {
    key: 'shotSize',
    label: 'Shot size',
    icon: '◎',
    type: 'select',
    options: [
      'Extreme close-up',
      'close up',
      'bust shot',
      'medium shot',
      'knee shot',
      'full shot',
      'long shot',
      'Extreme long shot',
    ],
  },
  cameraPosition: {
    key: 'cameraPosition',
    label: 'Camera Position',
    icon: '↕',
    type: 'select',
    options: ['Overhead', 'high-angle', 'Eye-level', 'Low-angle'],
  },
  lensFocalLength: {
    key: 'lensFocalLength',
    label: 'Lens-Focal Length',
    icon: '◍',
    type: 'lens-dial',
    options: ['8mm', '16mm', '24mm', '35mm', '50mm', '70mm', '85mm', '135mm'],
  },
  focusPosition: {
    key: 'focusPosition',
    label: 'Focus-Position',
    icon: '⌖',
    type: 'select',
    options: ['subject focus', 'foreground focus', 'background focus', 'rack focus', 'center focus'],
  },
  focusDepth: {
    key: 'focusDepth',
    label: 'Focus-Depth',
    icon: '◌',
    type: 'select',
    options: ['Shallow depth of field', 'Deep depth of field', 'Rack focus'],
  },
  light: {
    key: 'light',
    label: 'Light',
    icon: '✶',
    type: 'select',
    options: ['Front light', 'Side light', 'Back Light', 'Rim light'],
  },
  filmStockSensor: {
    key: 'filmStockSensor',
    label: 'Film Stock/Sensor',
    icon: '▣',
    type: 'select',
    options: ['35mm film', 'Digital', 'Fujifilm', 'IMAX', 'Anamorphic'],
  },
  resolution: {
    key: 'resolution',
    label: 'Resolution',
    icon: '▤',
    type: 'select',
    options: ['720p', '1080p'],
  },
  duration: {
    key: 'duration',
    label: 'Duration',
    icon: '⏱',
    type: 'select',
    options: ['5s', '10s'],
  },
  slowMotion: {
    key: 'slowMotion',
    label: 'Slow motion',
    icon: '↯',
    type: 'select',
    options: ['on', 'off'],
  },
  movement: {
    key: 'movement',
    label: 'Movement',
    icon: '↻',
    type: 'select',
    options: [
      'Static shot',
      'Pan left',
      'Pan right',
      'Tilt up',
      'Tilt down',
      'Dolly in',
      'Dolly out',
      'Pedestal up',
      'Pedestal down',
      'Zoom in',
      'Zoom out',
      'Drone shot',
      'Handheld',
      'Whip pan',
      'Arc shot',
      'Dolly zoom',
    ],
  },
};

export const AI_AGENTS: Record<AgentKey, AgentConfig> = {
  'nano-banana-pro': {
    name: 'Nano Banana Pro',
    mode: 'image',
    guideUrl: 'https://blog.google/products-and-platforms/products/gemini/prompting-tips-nano-banana-pro/',
    parameterKeys: ['style', 'aspectRatio', 'shotSize', 'cameraPosition', 'lensFocalLength', 'focusPosition', 'light'],
  },
  'gpt-image-1-5': {
    name: 'GPT 1.5',
    mode: 'image',
    guideUrl: 'https://developers.openai.com/cookbook/examples/multimodal/image-gen-1.5-prompting_guide',
    parameterKeys: ['style', 'aspectRatio', 'shotSize', 'cameraPosition', 'focusDepth', 'light', 'filmStockSensor'],
  },
  'seedream-4-5': {
    name: 'Seedream 4.5',
    mode: 'image',
    guideUrl: 'https://fal.ai/learn/devs/seedream-v4-5-prompt-guide',
    parameterKeys: ['style', 'aspectRatio', 'shotSize', 'lensFocalLength', 'focusDepth', 'filmStockSensor'],
  },
  'flux-2-pro': {
    name: 'Flux 2 Pro',
    mode: 'image',
    guideUrl: 'https://docs.bfl.ai/guides/prompting_guide_flux2',
    parameterKeys: ['style', 'aspectRatio', 'shotSize', 'cameraPosition', 'focusPosition', 'light'],
  },
  'kling-o1-image': {
    name: 'Kling 01 (Image)',
    mode: 'image',
    guideUrl: 'https://app.klingai.com/global/quickstart/klingai-image-o1-user-guide',
    parameterKeys: ['style', 'aspectRatio', 'shotSize', 'cameraPosition', 'lensFocalLength', 'focusDepth'],
  },
  'veo-3-1': {
    name: 'Veo 3.1',
    mode: 'video',
    guideUrl: 'https://blog.google/innovation-and-ai/technology/ai/veo-3-1-ingredients-to-video/',
    parameterKeys: ['resolution', 'duration', 'movement', 'slowMotion', 'cameraPosition'],
  },
  'kling-o1-video': {
    name: 'Kling 01 (Video)',
    mode: 'video',
    guideUrl: 'https://app.klingai.com/global/quickstart/klingai-image-o1-user-guide',
    parameterKeys: ['resolution', 'duration', 'movement', 'slowMotion', 'shotSize'],
  },
  'wan-2-6': {
    name: 'Wan 2.6',
    mode: 'video',
    guideUrl: 'https://fal.ai/learn/devs/wan-2-6-prompt-guide-mastering-all-three-generation-modes',
    parameterKeys: ['resolution', 'duration', 'movement', 'slowMotion', 'lensFocalLength'],
  },
  'seedance-1-5-pro': {
    name: 'Seedance 1.5 Pro',
    mode: 'video',
    guideUrl: 'https://fal.ai/learn/devs/seedance-1-5-prompt-guide',
    parameterKeys: ['resolution', 'duration', 'movement', 'cameraPosition', 'light'],
  },
  'sora-2': {
    name: 'Sora2',
    mode: 'video',
    guideUrl: 'https://cookbook.openai.com/examples/sora/sora2_prompting_guide',
    parameterKeys: ['resolution', 'duration', 'movement', 'shotSize', 'focusDepth'],
  },
  'hailuo-02': {
    name: 'Hailuo02',
    mode: 'video',
    guideUrl: 'https://www.imagine.art/blogs/hailuo-ai-prompt-guide',
    parameterKeys: ['resolution', 'duration', 'movement', 'cameraPosition', 'lensFocalLength'],
  },
};

export const DEFAULT_AGENT: AgentKey = 'nano-banana-pro';

export const IMAGE_AGENT_KEYS = (Object.keys(AI_AGENTS) as AgentKey[]).filter(
  (key) => AI_AGENTS[key].mode === 'image',
);

export const VIDEO_AGENT_KEYS = (Object.keys(AI_AGENTS) as AgentKey[]).filter(
  (key) => AI_AGENTS[key].mode === 'video',
);

export function createDefaultParamValues(agentKey: AgentKey): Record<string, string> {
  const agent = AI_AGENTS[agentKey];
  return agent.parameterKeys.reduce<Record<string, string>>((acc, paramKey) => {
    const paramDef = PARAM_LIBRARY[paramKey];
    if (paramDef) {
      acc[paramKey] = paramDef.options[0] ?? 'Auto';
    }
    return acc;
  }, {});
}

export const SHOT_PRESET_TEMPLATE =
  'A professional 16:9 cinematic bust shot of {subject}. Rule 1 (Human): Frame from the mid-chest to the top of the head. Rule 2 (Object): Frame the {subject} with immediate surroundings.';

export const QUALITY_BATCH_NOTE =
  'Quality/Batch Size는 프롬프트 텍스트가 아닌 백엔드 API 파라미터로 제어해야 안정적인 결과를 얻을 수 있습니다.';

export const MOCK_IMAGE_URL = 'https://picsum.photos/seed/cinerope-image/960/540';
export const MOCK_VIDEO_URL = 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4';
