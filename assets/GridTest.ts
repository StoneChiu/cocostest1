import {
    _decorator,
    Component,
    Node,
    EditBox,
    Button,
    UITransform,
    Sprite,
    resources,
    SpriteFrame,
    Prefab,
    ImageAsset,
    Layers,
    Color,
    random
} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('GridTest')
export class GridTest extends Component {

    @property(EditBox)
    box1: EditBox
    @property(EditBox)
    box2: EditBox
    @property(Button)
    genButton: Button
    @property(Node)
    gridRoot: Node

    gridpoints: Node[] = []


    colors: Color[] = [
        Color.RED,
        Color.GREEN,
        Color.BLUE,
        Color.GRAY,
        Color.BLACK,
    ]

    baseRate = [20, 20, 20, 20, 20]

    inputX = 0
    inputY = 0

    gridColors: number[][]

    start() {

        this.box1.node.on('editing-did-ended', (editbox: EditBox) => {
            let val = Number(editbox.string);
            if (isNaN(val)) {
                editbox.string = this.inputX + ""
            } else {
                this.inputX = val
            }
        });

        this.box2.node.on('editing-did-ended', (editbox) => {
            let val = Number(editbox.string);
            if (isNaN(val)) {
                editbox.string = this.inputY + ""
            } else {
                this.inputY = val
            }
        });

        this.node.on('touch-start',()=>{
            console.log('aaa')
        })

        this.genButton.node.on('click', (event) => {
            this.gridpoints.forEach((value) => {
                value.removeFromParent()
                value.destroy()
            })
            this.gridpoints = []

            this.gridColors = []

            for (let m = 0; m < 10; m++) {
                this.gridColors[m] = []
                for (let n = 0; n < 10; n++) {


                    let gridpoint = new Node()
                    this.gridpoints.push(gridpoint)

                    gridpoint.setPosition(-90 + n * 20, 90 - m * 20)

                    gridpoint.layer = Layers.Enum.UI_2D

                    let uitransform = gridpoint.addComponent(UITransform)


                    let sprite = gridpoint.addComponent(Sprite)

                    resources.load("default_sprite_splash", ImageAsset, (err, imageasset) => {
                        if (err)
                            console.error(err)

                        let spriteFrame = SpriteFrame.createWithImage(imageasset);
                        // console.log(spriteFrame)
                        sprite.spriteFrame = spriteFrame;

                        uitransform.setContentSize(20, 20)
                    });

                    let color = this.randomColor(m, n)
                    this.gridColors[m][n] = color;

                    sprite.color = new Color(this.colors[color])

                    this.gridRoot.addChild(gridpoint)
                }
            }
        })

    }

    randomColor(m: number, n: number) {
        let c1 = -1
        let c2 = -1

        if (m > 0) {
            c1 = this.gridColors[m - 1][n]
        }
        if (n > 0) {
            c2 = this.gridColors[m][n - 1]
        }

        let baseRateCopy = [...this.baseRate]

        let baseRateAll = 0
        if (c1 == c2) {
            if (c1 != -1) {
                baseRateCopy[c1] += this.inputY
                baseRateCopy[c1]=Math.max(baseRateCopy[c1],0)
            }
        } else {
            if (c1 != -1) {
                baseRateCopy[c1] += this.inputX
                baseRateCopy[c1]=Math.max(baseRateCopy[c1],0)
            }

            if (c2 != -1) {
                baseRateCopy[c2] += this.inputX
                baseRateCopy[c2]=Math.max(baseRateCopy[c2],0)
            }
        }

        baseRateAll=  baseRateCopy.reduce((pre, cur) => {
            pre += cur
            return pre
        },0)

        let randVal=baseRateAll*random()

        for (let i = 0; i < baseRateCopy.length; i++) {
            if( randVal<baseRateCopy[i])
                return i
            else
                randVal-=baseRateCopy[i]
        }

        throw '出错'


    }

    update(deltaTime: number) {

    }
}




