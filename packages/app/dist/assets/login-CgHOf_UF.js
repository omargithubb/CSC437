import{c as e,d as t,f as n,i as r,l as i,n as a,o,p as s,r as c,s as l,t as u,u as d}from"./view-ClXcsvmU.js";var f,p=s((()=>{d(),c(),f=class e extends HTMLElement{constructor(){super(),this.viewModel=u({username:``,password:``}).with(a(this),`username`,`password`),this.view=i`
    <form>
      <slot></slot>
      <button type="submit">
        <slot name="submit-label">Login</slot>
      </button>
    </form>
  `,t(this).styles(e.styles).replace(this.viewModel.render(this.view)).listen({submit:e=>this.submitLogin(e,this.getAttribute(`api`)||`#`)})}submitLogin(e,t){e.preventDefault();let n=this.viewModel.toObject();fetch(t,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(n)}).then(e=>{if(e.status!==200)throw`Login failed: ${e.status}`;return e.json()}).then(e=>{let{token:t}=e;this.dispatchEvent(new CustomEvent(`auth:message`,{bubbles:!0,composed:!0,detail:[`auth/signin`,{token:t,redirect:`/app`}]}))}).catch(e=>console.log(e))}static{this.styles=l`
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    button {
      padding: 0.5rem;
      cursor: pointer;
    }
  `}}}));n((()=>{d(),o(),p(),e({"auth-provider":r.Provider,"login-form":f})}))();