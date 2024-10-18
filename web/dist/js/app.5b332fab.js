(function(){"use strict";var e={5684:function(e,t,n){var o=n(3751),s=n(641),r=n(33);const i={id:"app"},a={class:"buttons"},u={class:"question-content"},l=["src"],c={class:"question-text"},d={class:"responses"},p=["onClick"],h=["onClick"],f=["onClick"],w={key:0,class:"add-question-modal"},g={class:"form-group"},k={class:"form-group"},b={class:"form-group"},L={class:"form-group"};function m(e,t,n,m,v,Q){return(0,s.uX)(),(0,s.CE)("div",i,[t[16]||(t[16]=(0,s.Lk)("h1",null,"Llistat de Preguntes",-1)),(0,s.Lk)("div",a,[(0,s.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>Q.fetchQuestions&&Q.fetchQuestions(...e)),class:"list-question-button"},"Llistat Pregunta"),(0,s.Lk)("button",{onClick:t[1]||(t[1]=(...e)=>Q.showAddQuestionModal&&Q.showAddQuestionModal(...e)),class:"add-question-button"},"Afegir Pregunta")]),((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(v.preguntes,(e=>((0,s.uX)(),(0,s.CE)("div",{key:e.id,class:"question-card"},[(0,s.Lk)("div",u,[(0,s.Lk)("img",{src:e.imatge,alt:"Pregunta Imagen",class:"question-image"},null,8,l),(0,s.Lk)("p",c,(0,r.v_)(e.pregunta),1)]),(0,s.Lk)("div",d,[t[9]||(t[9]=(0,s.Lk)("p",null,"Respostes:",-1)),((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(e.respostes,(t=>((0,s.uX)(),(0,s.CE)("div",{key:t.id,class:"response-option"},[(0,s.Lk)("button",{onClick:n=>Q.selectAnswer(e.id,t.id,e.resposta_correcta),class:(0,r.C4)([{correct:t.id===v.selectedAnswerId[e.id],incorrect:v.selectedAnswerId[e.id]&&t.id!==e.resposta_correcta},"select-answer-button"])},(0,r.v_)(t.etiqueta),11,p)])))),128))]),(0,s.Lk)("button",{onClick:t=>Q.editQuestion(e.id),class:"edit-current-question-button"},"Editar Pregunta",8,h),(0,s.Lk)("button",{onClick:t=>Q.deleteQuestion(e.id),class:"delete-question-button"},"Eliminar Pregunta",8,f)])))),128)),v.showModal?((0,s.uX)(),(0,s.CE)("div",w,[t[15]||(t[15]=(0,s.Lk)("h2",null,"Afegir Pregunta",-1)),(0,s.Lk)("form",{onSubmit:t[8]||(t[8]=(0,o.D$)(((...e)=>Q.addQuestion&&Q.addQuestion(...e)),["prevent"]))},[(0,s.Lk)("div",g,[t[10]||(t[10]=(0,s.Lk)("label",{for:"pregunta"},"Pregunta:",-1)),(0,s.bo)((0,s.Lk)("input",{id:"pregunta","onUpdate:modelValue":t[2]||(t[2]=e=>v.newQuestion.pregunta=e),placeholder:"Escribe la pregunta",required:""},null,512),[[o.Jo,v.newQuestion.pregunta]])]),(0,s.Lk)("div",k,[t[11]||(t[11]=(0,s.Lk)("label",{for:"imatge"},"URL de la imagen:",-1)),(0,s.bo)((0,s.Lk)("input",{id:"imatge","onUpdate:modelValue":t[3]||(t[3]=e=>v.newQuestion.imatge=e),placeholder:"Escribe la URL de la imagen",required:""},null,512),[[o.Jo,v.newQuestion.imatge]])]),(0,s.Lk)("div",b,[t[12]||(t[12]=(0,s.Lk)("label",{for:"resposta"},"Respuesta:",-1)),(0,s.bo)((0,s.Lk)("input",{id:"resposta","onUpdate:modelValue":t[4]||(t[4]=e=>v.newAnswerLabel=e),placeholder:"Escribe una respuesta",required:""},null,512),[[o.Jo,v.newAnswerLabel]]),(0,s.Lk)("button",{onClick:t[5]||(t[5]=(0,o.D$)(((...e)=>Q.addAnswer&&Q.addAnswer(...e)),["prevent"]))},"Añadir Respuesta")]),(0,s.Lk)("div",L,[t[13]||(t[13]=(0,s.Lk)("label",{for:"respuestaCorrecta"},"Respuesta Correcta (ID):",-1)),(0,s.bo)((0,s.Lk)("input",{id:"respuestaCorrecta","onUpdate:modelValue":t[6]||(t[6]=e=>v.newQuestion.resposta_correcta=e),type:"number",placeholder:"ID de respuesta correcta",required:""},null,512),[[o.Jo,v.newQuestion.resposta_correcta]])]),t[14]||(t[14]=(0,s.Lk)("button",{type:"submit"},"Guardar",-1)),(0,s.Lk)("button",{type:"button",onClick:t[7]||(t[7]=(...e)=>Q.closeModal&&Q.closeModal(...e))},"Cancelar")],32)])):(0,s.Q3)("",!0)])}n(4114);var v={data(){return{preguntes:[],newQuestion:{pregunta:"",imatge:"",respostes:[],resposta_correcta:null},newAnswerLabel:"",showModal:!1,selectedAnswerId:{}}},methods:{fetchQuestions(){fetch("/api/preguntes").then((e=>e.json())).then((e=>{this.preguntes=e})).catch((e=>console.error("Error fetching questions:",e)))},showAddQuestionModal(){this.showModal=!0},closeModal(){this.showModal=!1,this.resetNewQuestion()},resetNewQuestion(){this.newQuestion={pregunta:"",imatge:"",respostes:[],resposta_correcta:null},this.newAnswerLabel=""},addAnswer(){if(this.newAnswerLabel){const e={etiqueta:this.newAnswerLabel};this.newQuestion.respostes.push(e),this.newAnswerLabel=""}else alert("Por favor, completa el campo de respuesta.")},addQuestion(){this.newQuestion.pregunta&&this.newQuestion.imatge&&0!==this.newQuestion.respostes.length&&null!==this.newQuestion.resposta_correcta?fetch("/api/preguntes",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.newQuestion)}).then((e=>{if(!e.ok)throw new Error("Network response was not ok");return e.json()})).then((e=>{this.preguntes.push(e),this.resetNewQuestion(),this.closeModal()})).catch((e=>{console.error("Error adding question:",e),alert("Error al guardar la pregunta. Inténtalo de nuevo.")})):alert("Por favor, completa todos los campos necesarios.")},editQuestion(e){const t=this.preguntes.find((t=>t.id===e));t&&(this.newQuestion={...t},this.showModal=!0)},selectAnswer(e,t,n){this.selectedAnswerId[e]=t,t===n?alert("Correcto!"):alert("Incorrecto, intenta de nuevo.")},deleteQuestion(e){fetch(`/api/preguntes/${e}`,{method:"DELETE"}).then((t=>{if(!t.ok)throw new Error("Failed to delete");this.preguntes=this.preguntes.filter((t=>t.id!==e))})).catch((e=>{console.error("Error deleting question:",e)}))}},mounted(){this.fetchQuestions()}},Q=n(6262);const C=(0,Q.A)(v,[["render",m]]);var A=C;(0,o.Ef)(A).mount("#app")}},t={};function n(o){var s=t[o];if(void 0!==s)return s.exports;var r=t[o]={exports:{}};return e[o].call(r.exports,r,r.exports,n),r.exports}n.m=e,function(){var e=[];n.O=function(t,o,s,r){if(!o){var i=1/0;for(c=0;c<e.length;c++){o=e[c][0],s=e[c][1],r=e[c][2];for(var a=!0,u=0;u<o.length;u++)(!1&r||i>=r)&&Object.keys(n.O).every((function(e){return n.O[e](o[u])}))?o.splice(u--,1):(a=!1,r<i&&(i=r));if(a){e.splice(c--,1);var l=s();void 0!==l&&(t=l)}}return t}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[o,s,r]}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={524:0};n.O.j=function(t){return 0===e[t]};var t=function(t,o){var s,r,i=o[0],a=o[1],u=o[2],l=0;if(i.some((function(t){return 0!==e[t]}))){for(s in a)n.o(a,s)&&(n.m[s]=a[s]);if(u)var c=u(n)}for(t&&t(o);l<i.length;l++)r=i[l],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(c)},o=self["webpackChunkquiz"]=self["webpackChunkquiz"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[504],(function(){return n(5684)}));o=n.O(o)})();
//# sourceMappingURL=app.5b332fab.js.map