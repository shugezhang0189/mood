"use client"
import { useState } from "react";

// ── Fonts ──────────────────────────────────────────────────────────────────────
const FONT_LINK = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500&display=swap";

// ── Palette ────────────────────────────────────────────────────────────────────
const C = {
  cream: "#F7F5F2",
  oat: "#C8B8A2",
  ash: "#E8E4DF",
  fog: "#EDEBE7",
  ink: "#1A1A1A",
  slate: "#2C2C2C",
  muted: "#6B6560",
  rust: "#C8786A",
  pale: "#F0EDE9",
};

// ── Knowledge Graph Data ───────────────────────────────────────────────────────
const KNOWLEDGE_MAP = {
  "奶油风": {
    en: "Cream Style",
    description: "来自北欧极简主义与日本侘寂的交汇，以低饱和暖白为基底，强调材质的触感而非颜色的刺激。",
    palette: ["#F5F0E8", "#E8DDD0", "#D4C4B0", "#B8A898", "#8C7B6E"],
    paletteNames: ["奶白", "象牙", "燕麦", "沙丘", "大地"],
    materials: ["亚麻", "生棉", "未漂白羊毛", "天然陶", "浅橡木", "藤编"],
    principles: [
      { title: "色彩理论", desc: "单色调和（Monochromatic Harmony）——同色相不同明度的叠加，产生深度而非对比。" },
      { title: "材质语言", desc: "粗糙与光滑的对话：粗陶杯配亚麻桌布，触感落差制造视觉张力。" },
      { title: "光线逻辑", desc: "漫射自然光优先，避免直射点光源，哑光材质比高光更能保留温度感。" },
      { title: "留白哲学", desc: "负空间即内容——每件物品需要3倍于自身的空白才能被真正「看见」。" },
    ],
    resources: [
      { type: "course", label: "色彩理论基础", source: "RMIT University", url: "https://www.rmit.edu.au", tag: "OER 开放课程" },
      { type: "book", label: "Navigating the Arts", source: "Open Textbook Library", url: "https://open.umn.edu", tag: "免费教材" },
      { type: "museum", label: "Rijksmuseum 开放馆藏", source: "Rijksmuseum.nl", url: "https://www.rijksmuseum.nl/en/rijksstudio", tag: "公版图像" },
      { type: "book", label: "Wabi-Sabi for Artists, Designers…", source: "Leonard Koren", url: "#", tag: "参考书籍" },
    ],
    films: ["《小森林》", "《我的邻居山田君》", "Lost in Translation"],
    magazines: ["Kinfolk", "Cereal", "Apartamento"],
    brands: ["Aesop", "Muji", "Hawkins NY", "The Conran Shop"],
    photos: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
      "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=600&q=80",
    ]
  },
  "秋冬大衣": {
    en: "Autumn Coat",
    description: "秋冬廓形语言的核心是「量感」——以宽肩、下摆的重量感对抗季节的萧瑟，同时保留轮廓的克制。",
    palette: ["#6B4F3A", "#8B6F5A", "#C4A882", "#D4B896", "#E8D5BE"],
    paletteNames: ["深驼", "焦糖", "沙漠", "奶茶", "米杏"],
    materials: ["骆驼绒", "双面呢", "羊毛混纺", "皮革镶边", "金属扣件"],
    principles: [
      { title: "廓形理论", desc: "Oversized 的核心不是大，而是「重力感」——肩线下落，腰线消失，身体被布料包裹而非展示。" },
      { title: "色彩心理", desc: "驼色系的时间性：它同时属于过去（皮革、旧书）和未来（自然材料、可持续），因此产生永恒感。" },
      { title: "面料知识", desc: "克重决定垂感：300g/m² 以下飘逸，400g 以上建筑感，600g 以上雕塑感。" },
      { title: "搭配逻辑", desc: "大衣即句子——只需一件主角，其余单品退为语气词（白衬衫、黑裤、素靴）。" },
    ],
    resources: [
      { type: "course", label: "Fashion Fundamentals", source: "Open Yale / Coursera", url: "#", tag: "公开课" },
      { type: "book", label: "The Language of Clothes", source: "Alison Lurie", url: "#", tag: "参考书籍" },
      { type: "museum", label: "V&A 时装馆藏", source: "Victoria & Albert Museum", url: "https://www.vam.ac.uk", tag: "数字馆藏" },
      { type: "course", label: "Dress Theory", source: "FIT Open Course", url: "#", tag: "OER 课程" },
    ],
    films: ["《The Thomas Crown Affair》", "《Portrait of a Lady on Fire》", "Autumn Sonata"],
    magazines: ["System Magazine", "10 Magazine", "A Magazine"],
    brands: ["Totème", "The Row", "Lemaire", "Margaret Howell"],
    photos: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=600&q=80",
    ]
  },
};

// ── Feed Posts ─────────────────────────────────────────────────────────────────
const POSTS = [
  {
    id: 1, knowledgeKey: "奶油风",
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    author: "Mist.A", avatar: "https://i.pravatar.cc/40?img=28",
    title: "水泥灰与藤编的对话", category: "家装",
    likes: 3391, comments: 98, reposts: 204, liked: false, saved: false,
  },
  {
    id: 2, knowledgeKey: "秋冬大衣",
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    author: "Ciel.J", avatar: "https://i.pravatar.cc/40?img=32",
    title: "秋日大衣的褶皱语言", category: "服装配饰",
    likes: 5102, comments: 267, reposts: 441, liked: true, saved: false,
  },
  {
    id: 3, knowledgeKey: "奶油风",
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    author: "Luna.W", avatar: "https://i.pravatar.cc/40?img=47",
    title: "无色彩空间里的温度感", category: "家装",
    likes: 2847, comments: 134, reposts: 89, liked: false, saved: true,
  },
  {
    id: 4, knowledgeKey: "奶油风",
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80",
    author: "Veil.S", avatar: "https://i.pravatar.cc/40?img=21",
    title: "裸感·肌肤的第二层", category: "彩妆",
    likes: 6732, comments: 389, reposts: 567, liked: false, saved: false,
  },
  {
    id: 5, knowledgeKey: "秋冬大衣",
    src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80",
    author: "Echo.R", avatar: "https://i.pravatar.cc/40?img=55",
    title: "驼色系的三十种说法", category: "服装配饰",
    likes: 4215, comments: 187, reposts: 322, liked: false, saved: false,
  },
  {
    id: 6, knowledgeKey: "奶油风",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    author: "Nova.K", avatar: "https://i.pravatar.cc/40?img=11",
    title: "薄雾山脊·清晨4:47", category: "氛围",
    likes: 8820, comments: 512, reposts: 1029, liked: false, saved: false,
  },
];

const CATEGORIES = ["全部", "家装", "服装配饰", "彩妆", "氛围", "视觉素材"];

const LEARNING_TRACKS = [
  { id: "color", label: "色彩理论", en: "Color Theory", icon: "◐", count: 24,
    cover: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=600&q=80",
    desc: "从色轮到空间配色，建立系统的色彩认知" },
  { id: "fashion", label: "服装理论", en: "Fashion", icon: "◻", count: 18,
    cover: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    desc: "廓形、面料、造型心理学的专业学习路径" },
  { id: "interior", label: "室内美学", en: "Interior", icon: "◱", count: 31,
    cover: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    desc: "材质、光线、空间比例与风格溯源" },
  { id: "makeup", label: "彩妆知识", en: "Makeup", icon: "○", count: 15,
    cover: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80",
    desc: "色彩矫正、肤色理论、杂志妆的底层逻辑" },
  { id: "photo", label: "摄影美学", en: "Photography", icon: "◉", count: 22,
    cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    desc: "光线、色温、胶片色彩与构图的专业解析" },
  { id: "film", label: "电影美学", en: "Film", icon: "▷", count: 19,
    cover: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80",
    desc: "Wes Anderson、王家卫、A24 的视觉语法" },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
const fmt = (n) => n >= 1000 ? (n / 1000).toFixed(1) + "k" : n;

// ── SVG Icons ──────────────────────────────────────────────────────────────────
const Icons = {
  Heart: ({ on }) => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill={on?"currentColor":"none"} stroke="currentColor" strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  Msg: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Share: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
      <polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
    </svg>
  ),
  Save: ({ on }) => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill={on?"currentColor":"none"} stroke="currentColor" strokeWidth="1.5">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Home: () => (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  Learn: () => (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  Plus: () => (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  User: () => (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Back: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  ),
  Arrow: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <polyline points="19 12 12 19 5 12"/>
    </svg>
  ),
  Ext: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
};

// ══════════════════════════════════════════════════════════════════════════════
// POST CARD
// ══════════════════════════════════════════════════════════════════════════════
function PostCard({ post, onLike, onSave, onOpen }) {
  return (
    <div style={{ background: "#fff", marginBottom: 2 }}>
      {/* Image 70% */}
      <div onClick={() => onOpen(post)}
        style={{ position:"relative", width:"100%", paddingBottom:"118%", cursor:"pointer" }}>
        <img src={post.src} alt={post.title}
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }}/>
        <span style={{
          position:"absolute", top:12, right:12, background:"rgba(247,245,242,0.88)",
          backdropFilter:"blur(6px)", fontSize:11, padding:"3px 9px", color:C.muted,
          fontFamily:"'Inter',sans-serif", letterSpacing:"0.05em"
        }}>{post.category}</span>
      </div>
      {/* Text 30% */}
      <div style={{ padding:"14px 16px 12px", borderLeft:`1.5px solid ${C.oat}` }}>
        <p style={{
          fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:16, fontWeight:500,
          color:C.ink, margin:"0 0 7px", lineHeight:1.3
        }}>{post.title}</p>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:12 }}>
          <img src={post.avatar} alt={post.author}
            style={{ width:18, height:18, borderRadius:"50%", objectFit:"cover" }}/>
          <span style={{ fontFamily:"'Inter'", fontSize:12, color:C.muted }}>{post.author}</span>
        </div>
        {/* Actions */}
        <div style={{ display:"flex", alignItems:"center", gap:18 }}>
          <Btn onClick={()=>onLike(post.id)} color={post.liked?C.rust:C.muted}>
            <Icons.Heart on={post.liked}/> {fmt(post.likes)}
          </Btn>
          <Btn color={C.muted}><Icons.Msg/> {fmt(post.comments)}</Btn>
          <Btn color={C.muted}><Icons.Share/> {fmt(post.reposts)}</Btn>
          <Btn onClick={()=>onSave(post.id)} color={post.saved?C.oat:C.muted} style={{marginLeft:"auto"}}>
            <Icons.Save on={post.saved}/>
          </Btn>
        </div>
        {/* Knowledge bridge */}
        <button onClick={()=>onOpen(post, "knowledge")}
          style={{
            marginTop:14, width:"100%", display:"flex", alignItems:"center",
            justifyContent:"space-between", padding:"10px 12px",
            background:C.pale, border:`1px solid ${C.ash}`,
            cursor:"pointer", textAlign:"left"
          }}>
          <div>
            <span style={{ fontFamily:"'Inter'", fontSize:10, color:C.muted,
              letterSpacing:"0.1em", textTransform:"uppercase", display:"block", marginBottom:2 }}>
              为什么好看？
            </span>
            <span style={{ fontFamily:"'Cormorant Garamond',Georgia,serif",
              fontSize:14, color:C.ink, fontStyle:"italic" }}>
              进入「{post.knowledgeKey}」知识页
            </span>
          </div>
          <div style={{ color:C.oat, flexShrink:0 }}><Icons.Arrow/></div>
        </button>
      </div>
    </div>
  );
}

function Btn({ onClick, color, children, style={} }) {
  return (
    <button onClick={onClick} style={{
      display:"flex", alignItems:"center", gap:5, background:"none", border:"none",
      cursor:"pointer", color, padding:0, fontFamily:"'Inter'", fontSize:12,
      ...style
    }}>{children}</button>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// FEED PAGE
// ══════════════════════════════════════════════════════════════════════════════
function FeedPage({ posts, onLike, onSave, onOpen }) {
  const [cat, setCat] = useState("全部");
  const filtered = cat === "全部" ? posts : posts.filter(p => p.category === cat);

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      {/* Header */}
      <div style={{ padding:"20px 20px 0", background:C.cream, position:"sticky", top:0, zIndex:10 }}>
        <div style={{ display:"flex", alignItems:"baseline", gap:10, marginBottom:16 }}>
          <span style={{ fontFamily:"'Cormorant Garamond',Georgia,serif",
            fontSize:27, fontWeight:600, letterSpacing:"0.12em", color:C.ink }}>MOOD</span>
          <span style={{ fontFamily:"'Inter'", fontSize:10, color:C.oat,
            letterSpacing:"0.16em", textTransform:"uppercase" }}>美学知识库</span>
        </div>
        <div style={{ display:"flex", overflowX:"auto", scrollbarWidth:"none", paddingBottom:1 }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={()=>setCat(c)} style={{
              background:"none", border:"none", cursor:"pointer", padding:"6px 14px 10px",
              whiteSpace:"nowrap", fontFamily:"'Inter'", fontSize:13,
              color: cat===c ? C.ink : C.muted, fontWeight: cat===c ? 500 : 400,
              borderBottom: cat===c ? `1.5px solid ${C.ink}` : "1.5px solid transparent",
              transition:"all 0.15s"
            }}>{c}</button>
          ))}
        </div>
      </div>
      {/* Feed */}
      <div style={{ overflowY:"auto", flex:1, background:C.ash, gap:2, display:"flex", flexDirection:"column" }}>
        {filtered.map(p => (
          <PostCard key={p.id} post={p} onLike={onLike} onSave={onSave} onOpen={onOpen}/>
        ))}
        <div style={{ height:80 }}/>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// KNOWLEDGE PAGE  ← The core differentiator
// ══════════════════════════════════════════════════════════════════════════════
function KnowledgePage({ knowledgeKey, onBack }) {
  const K = KNOWLEDGE_MAP[knowledgeKey];
  const [activeSection, setActiveSection] = useState("principles");

  if (!K) return (
    <div style={{ padding:40, textAlign:"center", color:C.muted }}>
      <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18 }}>知识图谱构建中</p>
    </div>
  );

  const sections = [
    { id:"principles", label:"原理" },
    { id:"resources", label:"资源" },
    { id:"culture", label:"文化" },
  ];

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", overflowY:"auto" }}>
      {/* Hero — dark, signals depth */}
      <div style={{ background:C.slate, padding:"28px 20px 24px", position:"relative" }}>
        <button onClick={onBack} style={{
          background:"rgba(255,255,255,0.1)", border:"none", cursor:"pointer",
          width:34, height:34, borderRadius:"50%", display:"flex",
          alignItems:"center", justifyContent:"center", color:"#fff", marginBottom:20
        }}><Icons.Back/></button>

        <span style={{ fontFamily:"'Inter'", fontSize:10, color:C.oat,
          letterSpacing:"0.16em", textTransform:"uppercase", display:"block", marginBottom:8 }}>
          知识图谱 / {K.en}
        </span>
        <h1 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:32,
          fontWeight:500, color:"#F7F5F2", margin:"0 0 12px", lineHeight:1.15 }}>
          {knowledgeKey}
        </h1>
        <p style={{ fontFamily:"'Inter'", fontSize:13, color:"rgba(247,245,242,0.7)",
          margin:0, lineHeight:1.7 }}>{K.description}</p>

        {/* Palette strip */}
        <div style={{ display:"flex", gap:6, marginTop:20 }}>
          {K.palette.map((hex, i) => (
            <div key={hex} style={{ flex:1 }}>
              <div style={{ height:32, background:hex }}/>
              <p style={{ fontFamily:"'Inter'", fontSize:9, color:"rgba(247,245,242,0.5)",
                margin:"4px 0 0", letterSpacing:"0.05em" }}>{K.paletteNames[i]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Inspiration photos strip */}
      <div style={{ display:"flex", gap:2, overflowX:"auto", scrollbarWidth:"none",
        background:C.ash, padding:"2px 0", flexShrink:0 }}>
        {K.photos.map((src, i) => (
          <img key={i} src={src} alt="" style={{ height:100, width:75, objectFit:"cover", flexShrink:0 }}/>
        ))}
      </div>

      {/* Materials */}
      <div style={{ padding:"20px 20px 0", background:C.cream }}>
        <p style={{ fontFamily:"'Inter'", fontSize:10, color:C.muted,
          letterSpacing:"0.1em", textTransform:"uppercase", margin:"0 0 10px" }}>材质语言</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {K.materials.map(m => (
            <span key={m} style={{
              fontFamily:"'Inter'", fontSize:12, color:C.ink,
              background:C.fog, padding:"5px 12px", letterSpacing:"0.03em"
            }}>{m}</span>
          ))}
        </div>
      </div>

      {/* Section tabs */}
      <div style={{ display:"flex", background:C.cream, borderBottom:`1px solid ${C.ash}`,
        marginTop:20, position:"sticky", top:0, zIndex:5 }}>
        {sections.map(s => (
          <button key={s.id} onClick={()=>setActiveSection(s.id)} style={{
            flex:1, padding:"11px 0", background:"none", border:"none", cursor:"pointer",
            fontFamily:"'Inter'", fontSize:12, letterSpacing:"0.06em",
            color: activeSection===s.id ? C.ink : C.muted,
            borderBottom: activeSection===s.id ? `1.5px solid ${C.ink}` : "1.5px solid transparent",
            transition:"all 0.15s"
          }}>{s.label}</button>
        ))}
      </div>

      {/* Section content */}
      <div style={{ padding:"20px 20px 100px", background:C.cream, flex:1 }}>

        {activeSection === "principles" && (
          <div>
            <p style={{ fontFamily:"'Inter'", fontSize:10, color:C.muted,
              letterSpacing:"0.1em", textTransform:"uppercase", margin:"0 0 16px" }}>
              视觉原理
            </p>
            {K.principles.map((p, i) => (
              <div key={i} style={{
                paddingBottom:20, marginBottom:20,
                borderBottom: i < K.principles.length-1 ? `1px solid ${C.ash}` : "none"
              }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17,
                  fontWeight:500, color:C.ink, margin:"0 0 8px" }}>{p.title}</p>
                <p style={{ fontFamily:"'Inter'", fontSize:13, color:"#3A3A3A",
                  lineHeight:1.75, margin:0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeSection === "resources" && (
          <div>
            <p style={{ fontFamily:"'Inter'", fontSize:10, color:C.muted,
              letterSpacing:"0.1em", textTransform:"uppercase", margin:"0 0 16px" }}>
              学习资源 · 开放引用
            </p>
            {K.resources.map((r, i) => (
              <a key={i} href={r.url} target="_blank" rel="noreferrer"
                style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between",
                  padding:"14px 0", borderBottom:`1px solid ${C.ash}`,
                  textDecoration:"none", gap:12 }}>
                <div style={{ flex:1 }}>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15,
                    color:C.ink, display:"block", marginBottom:4 }}>{r.label}</span>
                  <span style={{ fontFamily:"'Inter'", fontSize:11, color:C.muted }}>
                    {r.source}
                  </span>
                </div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6, flexShrink:0 }}>
                  <span style={{ fontFamily:"'Inter'", fontSize:10, color:C.oat,
                    background:C.pale, padding:"2px 8px", letterSpacing:"0.04em" }}>
                    {r.tag}
                  </span>
                  <span style={{ color:C.muted }}><Icons.Ext/></span>
                </div>
              </a>
            ))}
            <div style={{ marginTop:20, padding:16, background:C.fog,
              borderLeft:`2px solid ${C.oat}` }}>
              <p style={{ fontFamily:"'Inter'", fontSize:12, color:C.muted,
                margin:0, lineHeight:1.7 }}>
                以上资源均为开放教育资源（OER）或公开馆藏，可合法引用与学习。
                Mood 不托管任何版权内容，仅提供链接导航。
              </p>
            </div>
          </div>
        )}

        {activeSection === "culture" && (
          <div>
            {[
              { label:"推荐电影", items: K.films },
              { label:"推荐杂志", items: K.magazines },
              { label:"参考品牌", items: K.brands },
            ].map(({ label, items }) => (
              <div key={label} style={{ marginBottom:24 }}>
                <p style={{ fontFamily:"'Inter'", fontSize:10, color:C.muted,
                  letterSpacing:"0.1em", textTransform:"uppercase", margin:"0 0 12px" }}>
                  {label}
                </p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {items.map(item => (
                    <span key={item} style={{
                      fontFamily:"'Cormorant Garamond',serif", fontSize:14,
                      color:C.ink, background:C.fog, padding:"6px 14px",
                      fontStyle: label === "推荐电影" ? "italic" : "normal"
                    }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// LEARN PAGE  — Library of tracks
// ══════════════════════════════════════════════════════════════════════════════
function LearnPage({ onOpenTrack }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", overflowY:"auto" }}>
      {/* Header */}
      <div style={{ padding:"24px 20px 0", background:C.slate }}>
        <span style={{ fontFamily:"'Inter'", fontSize:10, color:C.oat,
          letterSpacing:"0.16em", textTransform:"uppercase", display:"block", marginBottom:8 }}>
          Mood · Learning Library
        </span>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26,
          color:"#F7F5F2", fontWeight:400, margin:"0 0 8px", lineHeight:1.2 }}>
          美学知识图谱
        </h2>
        <p style={{ fontFamily:"'Inter'", fontSize:12, color:"rgba(247,245,242,0.6)",
          margin:"0 0 24px", lineHeight:1.6 }}>
          从灵感到认知——系统学习色彩、时尚、摄影、电影的底层语言
        </p>
        {/* Stats */}
        <div style={{ display:"flex", gap:0, borderTop:`1px solid rgba(255,255,255,0.1)`,
          paddingTop:20, paddingBottom:20 }}>
          {[["6", "学习专题"], ["129", "知识单元"], ["OER", "开放资源"]].map(([n, l]) => (
            <div key={l} style={{ flex:1, borderRight:`1px solid rgba(255,255,255,0.08)`,
              paddingRight:16, marginRight:16 }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22,
                color:"#F7F5F2", margin:"0 0 2px" }}>{n}</p>
              <p style={{ fontFamily:"'Inter'", fontSize:10, color:"rgba(247,245,242,0.5)",
                margin:0, letterSpacing:"0.04em" }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tracks grid */}
      <div style={{ padding:"20px 16px 90px", background:C.cream }}>
        <p style={{ fontFamily:"'Inter'", fontSize:10, color:C.muted,
          letterSpacing:"0.1em", textTransform:"uppercase", margin:"0 0 14px" }}>学习专题</p>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {LEARNING_TRACKS.map(track => (
            <button key={track.id} onClick={()=>onOpenTrack(track)}
              style={{ display:"flex", gap:14, background:"#fff", border:"none",
                padding:0, cursor:"pointer", textAlign:"left" }}>
              <img src={track.cover} alt={track.label}
                style={{ width:80, height:80, objectFit:"cover", flexShrink:0 }}/>
              <div style={{ padding:"12px 14px 12px 0", flex:1, borderBottom:`1px solid ${C.ash}` }}>
                <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:4 }}>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17,
                    fontWeight:500, color:C.ink }}>{track.label}</span>
                  <span style={{ fontFamily:"'Inter'", fontSize:10, color:C.muted }}>{track.en}</span>
                </div>
                <p style={{ fontFamily:"'Inter'", fontSize:12, color:C.muted,
                  margin:"0 0 8px", lineHeight:1.5 }}>{track.desc}</p>
                <span style={{ fontFamily:"'Inter'", fontSize:10, color:C.oat }}>
                  {track.count} 个单元
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Open resources note */}
        <div style={{ marginTop:28, padding:"16px 16px", background:C.fog,
          borderLeft:`2px solid ${C.oat}` }}>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15,
            color:C.ink, margin:"0 0 6px", fontStyle:"italic" }}>
            开放教育资源声明
          </p>
          <p style={{ fontFamily:"'Inter'", fontSize:12, color:C.muted,
            margin:0, lineHeight:1.7 }}>
            Mood Learning Library 收录的课程资源均来自
            RMIT、Smithsonian、V&A、Open Textbook Library 等
            机构的公开许可内容（CC BY / OER），合法引用，永久免费。
          </p>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TRACK DETAIL (sample — Color Theory)
// ══════════════════════════════════════════════════════════════════════════════
function TrackDetail({ track, onBack }) {
  const units = [
    { title:"色轮与色彩关系", type:"理论", done:false, source:"RMIT Colour Theory" },
    { title:"互补色与对比张力", type:"理论", done:false, source:"RMIT Colour Theory" },
    { title:"单色调和：奶油风的秘密", type:"案例", done:false, source:"Mood 编辑整理" },
    { title:"色温与空间情绪", type:"应用", done:false, source:"Open Textbook: Navigating the Arts" },
    { title:"配色实验：抽取一张图的色板", type:"练习", done:false, source:"Mood 互动练习" },
    { title:"Pantone 年度色的文化叙事", type:"延伸", done:false, source:"Smithsonian Digital Library" },
  ];

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", overflowY:"auto" }}>
      {/* Hero */}
      <div style={{ position:"relative" }}>
        <img src={track.cover} alt={track.label}
          style={{ width:"100%", height:180, objectFit:"cover", display:"block" }}/>
        <div style={{ position:"absolute", inset:0, background:"rgba(44,44,44,0.65)" }}/>
        <button onClick={onBack} style={{
          position:"absolute", top:16, left:16, background:"rgba(255,255,255,0.15)",
          backdropFilter:"blur(6px)", border:"none", cursor:"pointer", width:34, height:34,
          borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff"
        }}><Icons.Back/></button>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"0 20px 20px" }}>
          <span style={{ fontFamily:"'Inter'", fontSize:10, color:C.oat,
            letterSpacing:"0.14em", textTransform:"uppercase", display:"block", marginBottom:6 }}>
            {track.en}
          </span>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24,
            color:"#F7F5F2", fontWeight:500, margin:0 }}>{track.label}</h2>
        </div>
      </div>

      {/* Units */}
      <div style={{ padding:"20px 20px 90px", background:C.cream }}>
        <p style={{ fontFamily:"'Inter'", fontSize:10, color:C.muted,
          letterSpacing:"0.1em", textTransform:"uppercase", margin:"0 0 14px" }}>
          学习单元 · {units.length} 课
        </p>
        {units.map((u, i) => (
          <div key={i} style={{
            display:"flex", gap:14, paddingBottom:16, marginBottom:16,
            borderBottom: i < units.length-1 ? `1px solid ${C.ash}` : "none",
            cursor:"pointer"
          }}>
            <div style={{ width:28, height:28, background:C.fog, border:`1px solid ${C.ash}`,
              display:"flex", alignItems:"center", justifyContent:"center",
              flexShrink:0, fontFamily:"'Inter'", fontSize:11, color:C.muted }}>
              {String(i+1).padStart(2,"0")}
            </div>
            <div style={{ flex:1 }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15,
                fontWeight:500, color:C.ink, margin:"0 0 4px", lineHeight:1.3 }}>{u.title}</p>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                <span style={{ fontFamily:"'Inter'", fontSize:10, color:C.oat,
                  background:C.pale, padding:"2px 8px" }}>{u.type}</span>
                <span style={{ fontFamily:"'Inter'", fontSize:10, color:C.muted }}>
                  {u.source}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// BOTTOM NAV
// ══════════════════════════════════════════════════════════════════════════════
function BottomNav({ active, onChange }) {
  const tabs = [
    { key:"feed", icon:<Icons.Home/>, label:"灵感" },
    { key:"learn", icon:<Icons.Learn/>, label:"知识" },
    { key:"create", icon:<Icons.Plus/>, label:"" },
    { key:"profile", icon:<Icons.User/>, label:"我的" },
  ];

  return (
    <div style={{
      position:"absolute", bottom:0, left:0, right:0, background:C.cream,
      borderTop:`1px solid ${C.ash}`, display:"flex", zIndex:20
    }}>
      {tabs.map(t => (
        <button key={t.key} onClick={()=>onChange(t.key)} style={{
          flex:1, display:"flex", flexDirection:"column", alignItems:"center",
          gap:3, padding:"10px 0 12px", background:"none", border:"none", cursor:"pointer",
          color: active===t.key ? C.ink : "#A8A29E"
        }}>
          {t.key === "create" ? (
            <div style={{ width:42, height:42, background:C.ink, display:"flex",
              alignItems:"center", justifyContent:"center", color:"#F7F5F2", marginTop:-18 }}>
              {t.icon}
            </div>
          ) : t.icon}
          {t.key !== "create" && (
            <span style={{ fontFamily:"'Inter'", fontSize:10,
              letterSpacing:"0.04em", color:"inherit" }}>{t.label}</span>
          )}
        </button>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// APP ROOT
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [tab, setTab] = useState("feed");
  const [posts, setPosts] = useState(POSTS);
  const [view, setView] = useState(null);
  // view: null | { type: "post", post } | { type: "knowledge", key } | { type: "track", track }

  const handleLike = (id) => {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, liked:!p.liked, likes: p.liked ? p.likes-1 : p.likes+1 } : p
    ));
    if (view?.type === "post" && view.post.id === id) {
      setView(v => ({ ...v, post: { ...v.post, liked:!v.post.liked,
        likes: v.post.liked ? v.post.likes-1 : v.post.likes+1 } }));
    }
  };

  const handleSave = (id) => {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, saved:!p.saved } : p
    ));
  };

  const handleOpenPost = (post, mode) => {
    if (mode === "knowledge") {
      setView({ type:"knowledge", key: post.knowledgeKey });
    } else {
      const latest = posts.find(p => p.id === post.id) || post;
      setView({ type:"post", post: latest });
    }
  };

  const showNav = !view || view.type === "post";

  return (
    <div style={{
      width:"100%", maxWidth:390, margin:"0 auto", height:"100vh",
      background:C.cream, position:"relative", overflow:"hidden",
      display:"flex", flexDirection:"column"
    }}>
      <link rel="stylesheet" href={FONT_LINK}/>

      <div style={{ flex:1, overflowY:"auto", position:"relative" }}>
        {view?.type === "knowledge" ? (
          <KnowledgePage knowledgeKey={view.key} onBack={()=>setView(null)}/>
        ) : view?.type === "track" ? (
          <TrackDetail track={view.track} onBack={()=>setView(null)}/>
        ) : view?.type === "post" ? (
          /* Simple post detail — back goes to feed */
          <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
            <div style={{ position:"relative" }}>
              <img src={view.post.src} alt={view.post.title}
                style={{ width:"100%", maxHeight:"65vh", objectFit:"cover", display:"block" }}/>
              <button onClick={()=>setView(null)} style={{
                position:"absolute", top:16, left:16, background:"rgba(247,245,242,0.85)",
                backdropFilter:"blur(6px)", border:"none", cursor:"pointer", width:34, height:34,
                borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center"
              }}><Icons.Back/></button>
            </div>
            <div style={{ padding:"20px 20px 0", borderLeft:`1.5px solid ${C.oat}`, flex:1 }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20,
                fontWeight:500, color:C.ink, margin:"0 0 16px" }}>{view.post.title}</p>
              <div style={{ display:"flex", gap:20, marginBottom:20 }}>
                <Btn onClick={()=>handleLike(view.post.id)} color={view.post.liked?C.rust:C.muted}>
                  <Icons.Heart on={view.post.liked}/> {fmt(view.post.likes)}
                </Btn>
                <Btn color={C.muted}><Icons.Msg/> {fmt(view.post.comments)}</Btn>
                <Btn color={C.muted}><Icons.Share/> {fmt(view.post.reposts)}</Btn>
              </div>
              {/* Bridge to knowledge */}
              <div style={{ borderTop:`1px solid ${C.ash}`, paddingTop:20 }}>
                <p style={{ fontFamily:"'Inter'", fontSize:10, color:C.muted,
                  letterSpacing:"0.1em", textTransform:"uppercase", margin:"0 0 8px" }}>
                  这张图为什么好看？
                </p>
                <button onClick={()=>setView({ type:"knowledge", key: view.post.knowledgeKey })}
                  style={{ width:"100%", background:C.slate, border:"none", padding:"16px 20px",
                    cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between",
                    color:"#F7F5F2", textAlign:"left" }}>
                  <div>
                    <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18,
                      margin:"0 0 4px", fontStyle:"italic" }}>
                      进入「{view.post.knowledgeKey}」知识页
                    </p>
                    <p style={{ fontFamily:"'Inter'", fontSize:11, color:"rgba(247,245,242,0.6)",
                      margin:0 }}>色彩 · 材质 · 原理 · 参考资源</p>
                  </div>
                  <div style={{ color:C.oat, marginLeft:12 }}><Icons.Arrow/></div>
                </button>
              </div>
            </div>
            <div style={{ height:80 }}/>
          </div>
        ) : tab === "feed" ? (
          <FeedPage posts={posts} onLike={handleLike} onSave={handleSave} onOpen={handleOpenPost}/>
        ) : tab === "learn" ? (
          <LearnPage onOpenTrack={(track)=>setView({ type:"track", track })}/>
        ) : tab === "create" ? (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
            height:"100%", color:C.muted, fontFamily:"'Cormorant Garamond',serif", fontSize:18 }}>
            创作页面
          </div>
        ) : (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
            height:"100%", color:C.muted, fontFamily:"'Cormorant Garamond',serif", fontSize:18 }}>
            个人主页
          </div>
        )}
      </div>

      {showNav && <BottomNav active={tab} onChange={setTab}/>}
    </div>
  );
}
