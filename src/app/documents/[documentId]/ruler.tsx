import { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";

import {
  INITIAL_MARGIN,
  MINIMUM_MARGIN,
  PAGE_WIDTH,
} from "@/constants/document.const";

const markers = Array.from({ length: 83 }, (_, i) => i);

export const Ruler = () => {
  const [leftMargin, setLeftMargin] = useState<number>(INITIAL_MARGIN);
  const [rightMargin, setRightMargin] = useState<number>(INITIAL_MARGIN);

  const [isDraggingLeft, setIsDraggingLeft] = useState<boolean>(false);
  const [isDraggingRight, setIsDraggingRight] = useState<boolean>(false);

  const rulerRef = useRef<HTMLDivElement>(null);

  const handleLeftMarkerMouseDown = () => {
    setIsDraggingLeft(true);
  };

  const handleRightMarkerMouseDown = () => {
    setIsDraggingRight(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingLeft || !isDraggingRight) {
      const container = rulerRef.current?.querySelector("#ruler-container");
      if (container) {
        const containerRect = container.getBoundingClientRect();

        const relativeX = e.clientX - containerRect.left;
        const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, relativeX));

        if (isDraggingLeft) {
          const maxLeftPosition = PAGE_WIDTH - rightMargin - MINIMUM_MARGIN;
          const newLeftPosition = Math.min(maxLeftPosition, rawPosition);

          setLeftMargin(newLeftPosition); // TODO: Make Collaborative
        } else if (isDraggingRight) {
          const maxRightPosition = PAGE_WIDTH - (leftMargin + MINIMUM_MARGIN);
          const newRightPosition = Math.max(PAGE_WIDTH - rawPosition, 0);

          const constrainedRightPosition = Math.min(
            newRightPosition,
            maxRightPosition,
          );
          setRightMargin(constrainedRightPosition);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  const handleLeftMarkerDoubleClick = () => {
    setLeftMargin(INITIAL_MARGIN);
  };

  const handleRightMarkerDoubleClick = () => {
    setRightMargin(INITIAL_MARGIN);
  };

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="h-6 border-b border-gray-300 flex items-end relative select-none print:hidden"
    >
      <div
        id="ruler-container"
        className="mx-auto w-full h-full relative"
        style={{ maxWidth: `${PAGE_WIDTH}px` }}
      >
        <Marker
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={handleLeftMarkerMouseDown}
          onDoubleClick={handleLeftMarkerDoubleClick}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleRightMarkerMouseDown}
          onDoubleClick={handleRightMarkerDoubleClick}
        />
        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full" style={{ width: `${PAGE_WIDTH}px` }}>
            {markers.map((marker) => {
              const position = (marker * PAGE_WIDTH) / 82;

              return (
                <div
                  key={marker}
                  className="absolute bottom-0"
                  style={{ left: `${position}px` }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className="absolute bottom-0 w-[1px] h-2 bg-neutral-500" />
                      <span className="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className="absolute bottom-0 w-[1px] h-1.5 bg-neutral-500" />
                  )}
                  {marker % 5 !== 0 && (
                    <div className="absolute bottom-0 w-[1px] h-1 bg-neutral-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

const Marker = ({
  position,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick,
}: MarkerProps) => {
  return (
    <div
      className="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2"
      style={{ [isLeft ? "left" : "right"]: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className="absolute left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2" />
      <div className="absolute left-1/2 top-4 transform -translate-x-1/2"
        style={{
          height: "100vh",
          width: "1px",
          transform: "scaleX(0.5)",
          backgroundColor: "#3B72F6",
          display: isDragging ? "block" : "none",
        }}
      />
    </div>
  );
};