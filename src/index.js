import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super("PlayGame");
    }

    preload ()
    {
        this.load.image('logo', logoImg);
    }
      
    create ()
    {
        const logo = this.add.image(400, 150, 'logo');
      
        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });
    }

    update() {
        var pointer = this.input.activePointer;
        this.input.mouse.disableContextMenu();

        var wKey = this.input.keyboard.addKey('W');
        wKey.on('down', function (event) {
            if (counter.give < 1) {
                console.log("TEZOS GIVEN WITH KEYBOARD, W!!!");
            }
            counter.give += 1;
        });
        wKey.on('up', function (event) {
            counter.give = 0;
        });

        var aKey = this.input.keyboard.addKey('A');
        aKey.on('down', function (event) {
            if (counter.take < 1) {
                console.log("TEZOS TAKEN WITH KEYBOARD, A!!!");
            }
            counter.take += 1;
        });
        aKey.on('up', function (event) {
            counter.take = 0;
        });
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    disableContextMenu: false,
    scene: MyGame
};

const game = new Phaser.Game(config);

const container = document.getElementById('app');
const root = createRoot(container)
root.render(<App />);
