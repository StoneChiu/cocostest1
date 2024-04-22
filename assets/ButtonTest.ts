import { _decorator, Component, Node,tween ,Vec3,Tween,easing,BlockInputEvents,Sprite,Color} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class NewComponent extends Component {
    t1: Tween<Node>
    t2: Tween<Node>

    start() {

        let node = this.node.getChildByPath('button');



       this.t1=  tween(node)
            .to(0.3, { scale:new Vec3( 1.1,0.9) })
            .to(0.3, { scale: new Vec3( 0.9,1.1) })
            .union()
            .repeatForever()
            .start();

       this.t2=tween(node)
           .to(0.3, { scale:new Vec3( 0.8,0.6) })
           .to(0.3, { scale: new Vec3( 0.6,0.8) })
           .union()
           .repeatForever();

       this. node.on('touch-start',()=>{
            console.log('a')
            this.t1.stop()

           node.getComponent(Sprite).color=Color.GRAY

            tween(node)
                .to(0.5, { scale:new Vec3( 0.7,0.7) }, { easing: easing.bounceOut }).call(()=>{
                this.t2.start()
            }).start()
        })

        this. node.on('touch-end',()=>{
            console.log('b')
            this.t2.stop()
            node.getComponent(Sprite).color=Color.WHITE

            tween(node)
                .to(0.5, { scale:new Vec3( 1,1) }, { easing: easing.bounceOut }).call(()=>{
                this.t1.start()
            }).start()
        })
    }

    update(deltaTime: number) {

    }
}


