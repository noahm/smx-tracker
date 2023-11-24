import React, { useEffect, useRef, useState } from 'react';
import './animatedNumber.css';

interface Props {
  value: number | undefined;
  color?: string;
}

export function AnimatedNumber(props: Props) {
  const [displayValue, setDisplayValue] = useState(props.value);
  const element = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!element.current) {
      console.warn('no element ref');
      return;
    }

    if (props.value === displayValue) {
      return;
    }

    // grow
    element.current
      .animate({ transform: 'scale(1.5)', textShadow: 'var(--color-primary, #000) 0px 0px 10px' }, { duration: 1_000 })
      .finished.then((anim) => {
        setDisplayValue(props.value);
        anim.reverse();
      })
      .catch((e) => {
        console.error(e);
      });
  }, [props.value]);

  return (
    <span ref={element} style={{ color: props.color }} className="animated">
      {displayValue}
    </span>
  );
}
