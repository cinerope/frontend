import { create } from 'zustand';

import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';

export type UiMode = 'none' | 'node-menu' | 'agent-form' | 'comment-place';

type RFState = {
  nodes: Node[];
  edges: Edge[];
  uiMode: UiMode;
  setUiMode: (mode: UiMode) => void;
  addNode: (node: Node) => void;
  updateNodeData: (id: string, patch: Record<string, unknown>) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
};

const useStore = create<RFState>((set, get) => ({
  nodes: [],
  edges: [],
  uiMode: 'none',

  setUiMode: (mode) => set({ uiMode: mode }),

  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },

  updateNodeData: (id, patch) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id !== id) {
          return node;
        }

        return {
          ...node,
          data: {
            ...(node.data ?? {}),
            ...patch,
          },
        };
      }),
    });
  },

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: 'default',
          style: {
            stroke: '#6e7387',
            strokeWidth: 2,
            strokeDasharray: '6 5',
          },
        },
        get().edges,
      ),
    });
  },

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
}));

export default useStore;
