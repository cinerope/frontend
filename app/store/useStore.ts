import { create } from 'zustand';

import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    addEdge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyNodeChanges,
    applyEdgeChanges,
} from 'reactflow';

/**
 *  저장소에서 관리할 상태들의 타입 정의
 */
type RFState = {
    nodes: Node[];
    edges: Edge[];
    isPromptMode: boolean; // 프롬프트 입력 모드 여부
    setPromptMode: (mode: boolean) => void; // 모드 변경 함수
    addNode: (node: Node) => void;
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
};

/**
 * Zustand Store 생성
 */
const useStore = create<RFState>((set, get) => ({
    nodes: [],
    edges: [],

    isPromptMode: false, // 초기값은 일반 모드
    setPromptMode: (mode) => set({ isPromptMode: mode }),

    // 새로운 노드를 기존 배열 뒤에 추가
    addNode: (node: Node) => {
        set({
            nodes: [...get().nodes, node],
        });
    },

    // 노드 변경(이동, 삭제 등) 시 호출되는 함수
    onNodesChange: (changes: NodeChange[]) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },

    // 와이어 변경 시 호출되는 함수
    onEdgesChange: (changes: EdgeChange[]) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },

    // 노드와 노드를 연결했을 때 호출되는 함수
    onConnect: (connection: Connection) => {
        set({
            edges: addEdge(connection, get().edges),
        });
    },

    setNodes: (nodes: Node[]) => set({ nodes }),
    setEdges: (edges: Edge[]) => set({ edges }),
}));

export default useStore;