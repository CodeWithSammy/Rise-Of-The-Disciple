"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Unlock } from 'lucide-react';

interface SkillNode {
  id: number;
  title: string;
  level: number;
  x: number;
  y: number;
}

interface SkillEdge {
  source: number;
  target: number;
}

interface SkillTreeVisualProps {
  skillId: string;
  level: number;
  nodes: SkillNode[];
  edges: SkillEdge[];
}

export function SkillTreeVisual({ skillId, level, nodes, edges }: SkillTreeVisualProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [svgDimensions, setSvgDimensions] = useState({ width: 800, height: 400 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        setSvgDimensions({
          width: width,
          height: 400
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const isNodeUnlocked = (nodeLevel: number) => {
    return nodeLevel <= level;
  };

  return (
    <div ref={containerRef}>
      <div className="relative bg-[rgba(0,10,20,0.7)] rounded-lg p-4 overflow-hidden">
        <svg
          ref={svgRef}
          width={svgDimensions.width}
          height={svgDimensions.height}
          className="skill-tree-svg"
          style={{ minWidth: '100%' }}
        >
          {edges.map((edge, idx) => {
            const sourceNode = nodes.find(n => n.id === edge.source);
            const targetNode = nodes.find(n => n.id === edge.target);
            
            if (!sourceNode || !targetNode) return null;
            
            const startX = (sourceNode.x / 300) * svgDimensions.width;
            const startY = sourceNode.y;
            const endX = (targetNode.x / 300) * svgDimensions.width;
            const endY = targetNode.y;
            
            const isSourceUnlocked = isNodeUnlocked(sourceNode.level);
            const isTargetUnlocked = isNodeUnlocked(targetNode.level);
            
            return (
              <line
                key={`edge-${idx}`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke={isSourceUnlocked && isTargetUnlocked ? '#00a6ff' : '#1a2634'}
                strokeWidth={isSourceUnlocked && isTargetUnlocked ? 3 : 2}
                strokeOpacity={isSourceUnlocked && isTargetUnlocked ? 0.8 : 0.4}
                className="transition-all duration-300"
              />
            );
          })}
          
          {nodes.map((node) => {
            const nodeX = (node.x / 300) * svgDimensions.width;
            const nodeY = node.y;
            const nodeUnlocked = isNodeUnlocked(node.level);
            
            return (
              <g
                key={`node-${node.id}`}
                transform={`translate(${nodeX}, ${nodeY})`}
                onClick={() => setSelectedNode(node)}
                className="cursor-pointer transition-all duration-300 hover:scale-110"
                style={{ transform: `translate(${nodeX}px, ${nodeY}px)` }}
              >
                <circle
                  r={nodeUnlocked ? 25 : 20}
                  fill={nodeUnlocked ? 'url(#gradientUnlocked)' : 'url(#gradientLocked)'}
                  stroke={nodeUnlocked ? '#00a6ff' : '#1a2634'}
                  strokeWidth={2}
                  className="transition-all duration-300"
                />
                {nodeUnlocked ? (
                  <Unlock
                    className="h-5 w-5 text-white absolute"
                    style={{ transform: 'translate(-10px, -10px)' }}
                  />
                ) : (
                  <Lock
                    className="h-5 w-5 text-gray-400 absolute"
                    style={{ transform: 'translate(-10px, -10px)' }}
                  />
                )}
                <text
                  textAnchor="middle"
                  dy=".3em"
                  fill={nodeUnlocked ? 'white' : 'gray'}
                  fontSize="10"
                  fontWeight="bold"
                >
                  {node.level}
                </text>
              </g>
            );
          })}
          
          <defs>
            <radialGradient id="gradientUnlocked" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#00a6ff" />
              <stop offset="100%" stopColor="#0066cc" />
            </radialGradient>
            <radialGradient id="gradientLocked" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#1a2634" />
              <stop offset="100%" stopColor="#0d1318" />
            </radialGradient>
          </defs>
        </svg>
        
        {selectedNode && (
          <div className="absolute top-4 right-4 w-64 glass-card rounded-lg border border-[#00a6ff] shadow-lg">
            <div className="p-4">
              <h3 className="text-lg font-bold text-white">{selectedNode.title}</h3>
              <p className="text-sm text-gray-300 mt-1">Level {selectedNode.level} skill</p>
              <div className="mt-3">
                {isNodeUnlocked(selectedNode.level) ? (
                  <div className="text-[#00a6ff] text-sm flex items-center">
                    <Unlock className="h-4 w-4 mr-1" />
                    Unlocked
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm flex items-center">
                    <Lock className="h-4 w-4 mr-1" />
                    Locked (requires level {selectedNode.level})
                  </div>
                )}
              </div>
              {isNodeUnlocked(selectedNode.level) && (
                <Button className="w-full mt-3 bg-[#00a6ff] hover:bg-[#0088cc]">
                  View Details
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}