import React, { useEffect, useRef } from 'react';
import {
  Application,
  Assets,
  Sprite,
  DisplacementFilter,
} from 'pixi.js';

import speechBubble from "../assets/Bubble/speechBubble.png";


const RippleImage = () => {
  const pixiContainer = useRef(null);

  useEffect(() => {
    let app = null;
    let cancelled = false;
    const padding = 10;

    const safeDestroy = () => {
      if (!app) return;
      if (typeof app._cancelResize !== 'function') {
        app._cancelResize = () => {};
      }
      try {
        app.destroy(true, { children: true });
      } catch (_) {
        // init 미완료 시 destroy 내부에서 undefined 접근 등으로 에러 날 수 있음
      }
    };

    const run = async () => {
      app = new Application();

      await app.init({
        width: 349 + padding * 2,
        height: 317 + padding * 2,
        backgroundAlpha: 0,
      });

      if (cancelled) {
        safeDestroy();
        return;
      }

      if (pixiContainer.current) {
        pixiContainer.current.appendChild(app.canvas);
      }

      const imageTexture = await Assets.load(
        speechBubble
      );
      const displacementTexture = await Assets.load(
        'https://pixijs.com/assets/pixi-filters/displacement_map_repeat.jpg'
      );

      if (cancelled) {
        safeDestroy();
        return;
      }

      const image = new Sprite(imageTexture);
      // 크기: setSize(폭, 높이) 또는 image.width / image.height 로 지정
      image.setSize(369, 337);

      const displacementSprite = new Sprite(displacementTexture);

      if (displacementSprite.texture?.source) {
        displacementSprite.texture.source.wrapMode = 'repeat';
      }

      const displacementFilter = new DisplacementFilter({
        sprite: displacementSprite,
        scale: { x: 25, y: 25 }, // 숫자를 크게 할수록 왜곡 세기 증가 (예: 30~80)
      });

      image.filters = [displacementFilter];

      app.stage.addChild(image);
      app.stage.addChild(displacementSprite);

      app.ticker.add(() => {
        displacementSprite.x += 1;
        displacementSprite.y += 1;
      });
    };

    run();

    return () => {
      cancelled = true;
      if (app) safeDestroy();
    };
  }, []);

  return <div ref={pixiContainer} className="absolute" />;
};

export default RippleImage;
