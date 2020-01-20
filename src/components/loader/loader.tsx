import { Component, Host, h, Prop, Element } from '@stencil/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  tag: 'threed-loader',
  styleUrl: 'loader.css',
  shadow: true,
  assetsDirs: ['assets']
})
export class Loader {

  @Prop() parent: string;
  @Prop() scene: string;
  @Element() el: HTMLElement;

  componentDidLoad() {

    let parentElement = document.querySelector(this.parent);

    let scene = this.setupScene();
    let camera = this.setupCamera(parentElement);

    let renderer = this.setupRenderer(parentElement);

    let light = this.setupLight();
    scene.add(light);

    let controls = this.setupControls(camera, renderer);
    controls.update();

    this.loadModel(scene);


    var animate = () => {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    };

    animate();

  }

  // onAnimation() {

  // }

  setupScene() {

    var scene = new THREE.Scene();
    return scene;
  }

  setupCamera(parentElement) {
    let camera = new THREE.PerspectiveCamera( 75, parentElement.clientWidth/parentElement.clientHeight, 0.1, 1000 );
    camera.position.z = 5;
    return camera;
  }

  setupRenderer(parentElement) {

    let canvasAppend = this.el.shadowRoot.querySelector('canvas');
    let renderer = new THREE.WebGLRenderer({canvas: canvasAppend, alpha: true});
    renderer.setSize( parentElement.clientWidth, parentElement.clientHeight );
    return renderer;
  }

  setupLight() {
    let light = new THREE.AmbientLight( 0xFFFFFF );
    return light;
  }

  setupControls(camera, renderer) {
    let controls = new OrbitControls(camera, renderer.domElement);
    return controls;
  }

  loadModel(scene) {

    var loader = new GLTFLoader();

    loader.load(
      // resource URL
      this.scene,
      (gltf) => {
        scene.add( gltf.scene );
      },
      // progress
      (xhr) => {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
      // errors
      (error) => {
        console.log('An error happened', error);
      }
    );
  }

  render() {
    return (
      <Host>
        <slot>
          <canvas></canvas>
        </slot>
      </Host>
    );
  }

}
