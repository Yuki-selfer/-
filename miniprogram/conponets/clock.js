Component({
properties:{
  width:{
    type:Number,
    value:0
  },
  height:{
    type:Number,
    value:0
  },
},
data:{
  today:"null",
   timer:null

},
methods:{
  showctx:function name(params) {

    
    wx.getSystemInfo({
      success:res=>{

        console.log(res,this.height)
this.properties.width=res.windowWidth;
    this.properties.height=res.windowHeight;
      }
      
    })

    var ctx=wx.createCanvasContext('clock',this);
    console.log("ctx,ctx",ctx)
    const D6=6*Math.PI/180;
    const D30=30*Math.PI/180;

    const D90=90*Math.PI/180;

    var width=this.properties.width;
    var height=this.properties.height;
    console.log(width,"width")

    var radius=width/2-30;
    draw();
  
    this.setData({

      timer:setInterval(draw,1000)})
    function draw(){


      ctx.translate(width/2,height/2);
      drawClock(ctx,radius);
      drawHand(ctx,radius);
      ctx.draw();

    }


    function drawClock(ctx,radius){
      console.log(ctx)
      ctx.setLineWidth(2);
      ctx.beginPath();
      ctx.arc(0,0,radius,0,2*Math.PI,true);
      ctx.stroke();
      
      ctx.setLineWidth(1);
      ctx.beginPath();
      ctx.arc(0,0,8,0,2*Math.PI,true),
      ctx.stroke();
      ctx.setLineWidth(1);

      ctx.setLineWidth(5);
   for(let i=0;i<12;++i){
     ctx.rotate(D30);
     ctx.beginPath();
     ctx.moveTo(radius,0);
     ctx.lineTo(radius-15,0);
     ctx.stroke();

   }
   ctx.setLineWidth(1);
   for(let i=0;i<60;++i){
    ctx.rotate(D6);
    ctx.beginPath();
    ctx.moveTo(radius,0);
    ctx.lineTo(radius-10,0);
    ctx.stroke();

  }
  ctx.setFontSize(20);
  ctx.textBaseLine='middle';
  var r=radius-30;
  for(let i=1;i<=12;++i){
    var x=r*Math.cos(D30*i-D90);
    var y=r*Math.sin(D30*i-D90);
    if(i>10){
      ctx.fillText(i,x-12,y)
    }else{
      ctx.fillText(i,x-6,y)
    }
   

  }

    }
    function drawHand(ctx,radius){
      console.log(ctx)
      
      var t=new Date()
      var h=t.getHours();
      var m=t.getMinutes();
      var s=t.getSeconds();
h=h>12?h-12:h;
ctx.rotate(-D90);
ctx.save();
ctx.rotate(D30*(h+m/60+s/3600))
ctx.setLineWidth(6);
ctx.beginPath();
ctx.moveTo(-20,0);
ctx.lineTo(radius/2.6,0)
ctx.stroke()
ctx.restore();
ctx.save();
ctx.rotate(D6*(m+s/60))
ctx.setLineWidth(4);
ctx.beginPath();
ctx.moveTo(-20,0)//往反方向延申20px
ctx.lineTo(radius/1.8,0)
ctx.stroke()
ctx.restore();
ctx.save();
ctx.rotate(D6*s)
ctx.setLineWidth(2);
ctx.beginPath();
ctx.moveTo(-20,0)//往反方向延申20px
ctx.lineTo(radius/1.6,0)
ctx.stroke()
ctx.restore();

    }
    
  }

}


})