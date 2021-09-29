import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: () =>({
      actorTemplates: 
      {
        maru:{defaultHp:20.0, imagePath:'', deffencePoint:0,
        // attackLocationsは、x,yで作る。実装するときにイメージしやすいように。
          attackProps:{targetNumb:1, attackPoint: 3, attackLocations:[[1,0]]}
        },
        sikaku:{defaultHp:40.0, imagePath:'', deffencePoint:0,
        // attackLocationsは、x,yで作る。実装するときにイメージしやすいように。
          attackProps:{targetNumb:1, attackPoint: 2, attackLocations:[[1,0]]}
        },
        sankaku:{defaultHp:15.0, imagePath:'', deffencePoint:0,
        // attackLocationsは、x,yで作る。実装するときにイメージしやすいように。
          attackProps:{targetNumb:1, attackPoint: 2.5, attackLocations:[[1,0],[2,0]]}
        }
      },
      // actorがいれば、そのuuidが入る。getするときに[y][x]になっちゃうのがややっこしいところ。
      map: [['','','','','','','']],
      // actorの配列〜{id, actorName, whichSide, maxHp, hp, deffencePoint, attackProps, x, y}
      actors:[]
    }),
    getters: {
      getActors(state) {
        return state.actors;
      },
      getActor: (state) => (id) => {
        const tmp = state.actors.filter(e => e.id === id);
        if(tmp.length > 0){
          return tmp[0];
        }
        return null;
      },
      getActorNumb: (state,getters) => (id) => {
        const actor = getters.getActor(id);

        if(actor !== null){
          return state.actors.indexOf(actor);
        }
        return null;
      },
      getMap(state) {
        return state.map;
      },
      getPosId: (state) => (pos) => {
        return state.map[pos.y][pos.x];
      },
      getTemplate: (state) => (name) => {
        return state.actorTemplates[name];
      }
    },
    mutations: {
      // actor配置 obj:{uuid, actorName, x, y, whichSide}
      spawnActor(state, obj) {
        // 位置被ってたら召喚中止
        if(state.map[obj.y][obj.x] !== ''){
          return
        }
        const template = state.actorTemplates[obj.actorName];
        state.actors.unshift({
          id : obj.uuid ,
          actorName : obj.actorName ,
          whichSide : obj.whichSide ,
          maxHp : template.defaultHp ,
          hp : template.defaultHp ,
          deffencePoint : template.deffencePoint,
          attackProps : template.attackProps,
          x  : obj.x , 
          y  : obj.y
        })
      },
      // actor移動 obj:{actorNumb, addX, addY}
      moveActor(state, obj) {
        state.map[state.actors[obj.actorNumb].y][state.actors[obj.actorNumb].x] = '';
      
        state.actors[obj.actorNumb].x += obj.addX;
        state.actors[obj.actorNumb].y += obj.addY;

        state.map[state.actors[obj.actorNumb].y][state.actors[obj.actorNumb].x] = state.actors[obj.actorNumb].id;
      },
      // actorにダメージ obj:{damagedActorNumb, takeDActorNumb}
      damageToActor(state, obj){
        const damagedActor = state.actors[obj.takeDActorNumb];
        let damage = state.actors[obj.damagedActorNumb].attackProps.attackPoint - damagedActor.deffencePoint;
        // 防御高すぎて回復しちゃった対策
        if(damage<0){
          damage = 0;
        }


        damagedActor.hp -= damage;
      },
      // 削除関数
      destroyActor(state,actorNumb){
        state.map[state.actors[actorNumb].y][state.actors[actorNumb].x] = '';
        state.actors.splice(actorNumb, 1);
      }
    }
  })
}



export default createStore;