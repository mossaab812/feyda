import { useState } from 'react'

type View = 'home' | 'formations' | 'opportunities' | 'suppliers' | 'talents' | 'assessment'

type Formation = {
  id: string
  title: string
  provider: string
  category: string
  duration: string
  priceDZD: number
  oldPrice?: number
  rating: number
  verified: boolean
}

type Opportunity = {
  id: string
  company: string
  title: string
  category: string
  budget: string
  location: string
  applicants: number
  status: 'مفتوحة' | 'قيد المراجعة'
}

type Supplier = {
  id: string
  name: string
  category: string
  location: string
  verified: boolean
  productsCount: number
  rating: number
}

type Talent = {
  id: string
  name: string
  category: string
  score: number
  verified: boolean
  projects: number
  location: string
}

const formations: Formation[] = [
  { id: 'f1', title: 'تطوير الويب Fullstack — React + Node.js', provider: 'أكاديمية كود الجزائر', category: 'برمجة', duration: '12 أسبوع', priceDZD: 45000, oldPrice: 65000, rating: 4.8, verified: true },
  { id: 'f2', title: 'تصميم UI/UX احترافي — Figma إلى المنتج', provider: 'مدرسة التصميم وهران', category: 'تصميم', duration: '8 أسابيع', priceDZD: 32000, rating: 4.7, verified: true },
  { id: 'f3', title: 'التسويق الرقمي و التجارة الإلكترونية', provider: 'فورماتور معتمد — قسنطينة', category: 'تسويق', duration: '6 أسابيع', priceDZD: 28000, oldPrice: 38000, rating: 4.6, verified: true },
  { id: 'f4', title: 'صيانة وتركيب الطاقات المتجددة', provider: 'مركز التكوين المهني — الجزائر', category: 'تقني', duration: '10 أسابيع', priceDZD: 38000, rating: 4.9, verified: true },
  { id: 'f5', title: 'تحليل البيانات — Python & Power BI', provider: 'داتا سكول الجزائر', category: 'برمجة', duration: '9 أسابيع', priceDZD: 42000, rating: 4.8, verified: true },
  { id: 'f6', title: 'التصوير وصناعة المحتوى للشركات', provider: 'ستوديو ميديا — عنابة', category: 'إبداع', duration: '5 أسابيع', priceDZD: 25000, rating: 4.5, verified: false },
]

const opportunities: Opportunity[] = [
  { id: 'o1', company: 'Startup جزائري — لوجستيك', title: 'مطور واجهات React لمنصة تتبع الشحنات', category: 'برمجة', budget: '80,000 - 120,000 DZD / شهر', location: 'عن بُعد — الجزائر', applicants: 12, status: 'مفتوحة' },
  { id: 'o2', company: 'شركة صناعية — سطيف', title: 'مصمم هوية بصرية وتغليف منتجات غذائية', category: 'تصميم', budget: '45,000 DZD للمشروع', location: 'سطيف', applicants: 7, status: 'مفتوحة' },
  { id: 'o3', company: 'مورد معدات — ورقلة', title: 'مسؤول مبيعات B2B لقطاع الطاقة', category: 'مبيعات', budget: '60,000 + عمولة DZD', location: 'ورقلة / الجنوب', applicants: 9, status: 'مفتوحة' },
  { id: 'o4', company: 'شركة ناشئة — Fintech', title: 'محلل بيانات — تتبع سلوك المستخدم', category: 'برمجة', budget: '95,000 DZD / شهر', location: 'الجزائر العاصمة', applicants: 15, status: 'قيد المراجعة' },
]

const suppliers: Supplier[] = [
  { id: 's1', name: 'مؤسسة الإمداد الصناعي — الجزائر', category: 'مواد أولية / معدات', location: 'الجزائر — الرويبة', verified: true, productsCount: 128, rating: 4.8 },
  { id: 's2', name: 'الواحة للتوريد — غرداية', category: 'معدات فلاحية', location: 'غرداية', verified: true, productsCount: 86, rating: 4.7 },
  { id: 's3', name: 'تِك ستوك — وهران', category: 'إلكترونيات / حواسيب', location: 'وهران', verified: true, productsCount: 210, rating: 4.9 },
  { id: 's4', name: 'بناء برو — قسنطينة', category: 'مواد بناء', location: 'قسنطينة', verified: false, productsCount: 54, rating: 4.4 },
]

const talents: Talent[] = [
  { id: 't1', name: 'أمينة ب.', category: 'تطوير ويب', score: 88, verified: true, projects: 34, location: 'الجزائر' },
  { id: 't2', name: 'ياسين م.', category: 'تصميم UI/UX', score: 91, verified: true, projects: 27, location: 'وهران' },
  { id: 't3', name: 'سارة ق.', category: 'تسويق رقمي', score: 82, verified: true, projects: 19, location: 'عنابة' },
  { id: 't4', name: 'مهدي ل.', category: 'إلكترونيات', score: 76, verified: false, projects: 12, location: 'سطيف' },
]

const productsSample = [
  { name: 'حاسوب محمول Pro — 16GB/512GB', price: 185000, stock: 12 },
  { name: 'لوح طاقة شمسية 550W — مونو', price: 42000, stock: 40 },
  { name: 'طابعة حرارية للإيصالات', price: 23000, stock: 25 },
  { name: 'إسمنت — طن (CEM II)', price: 18000, stock: 100 },
]

const assessmentQuestions = [
  { id: 'q1', label: 'HTML / CSS / أساسيات الويب', category: 'برمجة' },
  { id: 'q2', label: 'JavaScript / TypeScript — المنطق والخوارزميات', category: 'برمجة' },
  { id: 'q3', label: 'React أو إطار واجهات حديث', category: 'برمجة' },
  { id: 'q4', label: 'تصميم واجهات — Figma / تجربة المستخدم', category: 'تصميم' },
  { id: 'q5', label: 'قواعد البيانات — SQL / Supabase / Firebase', category: 'بيانات' },
  { id: 'q6', label: 'التواصل مع العميل وإدارة المشروع', category: 'تواصل' },
  { id: 'q7', label: 'التسويق الذاتي وبناء البورتفوليو', category: 'تسويق' },
  { id: 'q8', label: 'حل المشاكل والعمل تحت الضغط', category: 'مهارات' },
]

export default function App() {
  const [view, setView] = useState<View>('home')
  const [filterCat, setFilterCat] = useState<string>('الكل')
  const [assessment, setAssessment] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [toast, setToast] = useState<string | null>(null)

  const score =
    Math.round(
      (Object.values(assessment).reduce((a, b) => a + b, 0) / (assessmentQuestions.length * 10)) * 100
    ) || 0
  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handleAssess = (id: string, val: number) => {
    setAssessment(prev => ({ ...prev, [id]: val }))
  }

  const categories = ['الكل', 'برمجة', 'تصميم', 'تسويق', 'تقني', 'إبداع']

  return (
    <div style={{ direction: 'rtl' }}>
      {/* Notice bar */}
      <div className="notice">
        <span>نسخة تجريبية — لا تحجب فرص أساسية عن غير المشتركين. التقييم إرشادي وليس شهادة توظيف.</span>
        <span style={{ opacity: 0.8 }}>🇩🇿 FEYDA Platform — v1.0</span>
      </div>

      {/* Header */}
      <header>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <a className="brand" onClick={() => setView('home')}>
            فيدة <span>FEYDA — شبكة الفريلانسر والتكوين والمورد</span>
          </a>
          <nav>
            <button className={view === 'home' ? 'active' : ''} onClick={() => setView('home')}>الرئيسية <i>◈</i></button>
            <button className={view === 'assessment' ? 'active' : ''} onClick={() => setView('assessment')}>التقييم <i>✦</i></button>
            <button className={view === 'formations' ? 'active' : ''} onClick={() => setView('formations')}>التكوينات <i>◐</i></button>
            <button className={view === 'opportunities' ? 'active' : ''} onClick={() => setView('opportunities')}>الفرص <i>⬡</i></button>
            <button className={view === 'suppliers' ? 'active' : ''} onClick={() => setView('suppliers')}>الموردون <i>⬢</i></button>
            <button className={view === 'talents' ? 'active' : ''} onClick={() => setView('talents')}>المواهب <i>✧</i></button>
          </nav>
        </div>
        <div className="account">
          <button className="outline" onClick={() => showToast('تسجيل الدخول يتطلب Supabase — أضف VITE_SUPABASE_URL في .env.local')}>دخول</button>
          <button className="primary" onClick={() => setView('assessment')}>ابدأ التشخيص المجاني</button>
        </div>
      </header>

      {/* Hero - only on home */}
      {view === 'home' && (
        <section className="hero">
          <div className="eyebrow">الجزائر — من الفكرة إلى السوق في مسار واحد</div>
          <h1>من <em>تشخيص مهاراتك</em><br /> إلى مشروعك<br /> وموردك الموثوق</h1>
          <p>فيدة تربط <b style={{ color: '#f0fdf4' }}>الفريلانسر</b> بالتكوين المناسب، ثم بفرص شركات حقيقية، ثم بموردي السلع والمعدات — كل خطوة موثقة ومراجعة بشرية. سنة أولى مجانية للشركات والموردين بشروط واضحة، بلا تجديد تلقائي مفاجئ.</p>
          <div className="actions">
            <button className="primary big" onClick={() => setView('assessment')}>قيّم مهاراتك الآن — 2 دقيقة</button>
            <button className="outline big" onClick={() => setView('opportunities')}>استعرض فرص الشركات</button>
          </div>

          <div className="flow">
            <div><b>01</b><strong>تشخيص ذكي</strong><small>GPT-4o يقيّم إجاباتك + مراجعة بشرية</small></div>
            <span>→</span>
            <div><b>02</b><strong>تكوين أو ملف كفاءة</strong><small>إذا ≥75 تفتح الفرص، وإلا نقترح تكوينات موثقة</small></div>
            <span>→</span>
            <div><b>03</b><strong>مطابقة مع فرصة</strong><small>مشروع شركة / Startup بميزانية DZD واضحة</small></div>
            <span>→</span>
            <div><b>04</b><strong>توريد ومتابعة</strong><small>دليل موردين موثقين + إدارة طلبات</small></div>
          </div>
        </section>
      )}

      <main className="content">
        {/* HOME - business model cards */}
        {view === 'home' && (
          <>
            <div className="sectionhead">
              <div>
                <div className="eyebrow">نموذج عمل واضح</div>
                <h2>كل طرف يعرف ماذا يربح وماذا يدفع</h2>
                <p className="intro">لا وعود توظيف وهمية. الأسعار بالدينار الجزائري، والتخفيض لا يُعرض إلا بعد اعتماد الشريك.</p>
              </div>
              <button className="outline" onClick={() => showToast('تحميل دليل الاستخدام PDF — قريباً')}>تحميل الدليل</button>
            </div>

            <div className="cards">
              <div className="card">
                <div className="symbol">⬢</div>
                <h3>للشركة والـ Startup</h3>
                <p>انشر فرصك، استقبل ملفات موثقة، وتابع الطلبات. سنة أولى مجانية بموعد وشروط معلنة، ثم اشتراك اختياري لأدوات المتابعة والمطابقة.</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <span className="pill">نشر فرص</span><span className="pill">إدارة موردين</span>
                </div>
                <button className="link" onClick={() => setView('opportunities')}>أنشئ أول فرصة →</button>
              </div>
              <div className="card">
                <div className="symbol">◈</div>
                <h3>للمستقل</h3>
                <p>مسار أساسي مجاني دائماً. اشتراك اختياري فقط لمزايا إضافية: بورتفوليو متقدم، تنبيهات لحظية، وتحليلات أداء.</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <span className="pill">تقييم مجاني</span><span className="pill gold">فرص غير محجوبة</span>
                </div>
                <button className="link" onClick={() => setView('assessment')}>ابدأ التقييم →</button>
              </div>
              <div className="card">
                <div className="symbol">⬣</div>
                <h3>للمورد</h3>
                <p>أنشئ كتالوجك بالأسعار DZD، واستقبل طلبات شركات موثقة. التوثيق بإشراف مسؤول — لا يمنح الحساب دوراً لنفسه.</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <span className="pill">كتالوج DZD</span><span className="pill">طلبات B2B</span>
                </div>
                <button className="link" onClick={() => setView('suppliers')}>استعرض دليل الموردين →</button>
              </div>
              <div className="card">
                <div className="symbol">✦</div>
                <h3>للمدرسة / الفورماتور</h3>
                <p>أدرج برامجك بعد التوثيق. العمولة باتفاق واضح فقط بعد التسجيل الفعلي — لا نعرض خصماً كحقيقة إلا بموافقة الشريك.</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <span className="pill gold">إدراج موثق</span><span className="pill">عمولة شفافة</span>
                </div>
                <button className="link" onClick={() => setView('formations')}>قدّم برنامجك →</button>
              </div>
            </div>

            <div className="banner">
              <div>
                <h3>جاهز للإنتاج — مع ضوابط أمان</h3>
                <p>قبل الإطلاق الفعلي: Rate limits على /api/ai/assessment، مراجعة بشرية للملفات، حماية إساءة الاستخدام، سجلات تدقيق، ونسخ احتياطي يومي في Supabase. المفاتيح الخادمية (SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY) تبقى في Cloudflare Pages Secrets فقط — لا تضعها في VITE_.</p>
              </div>
              <div className="year">01<div style={{ fontSize: 46, color: '#f59e0b' }}>سنة</div><small>مجانية للشركات<br />والموردين</small></div>
            </div>

            <div style={{ marginTop: 40 }} className="sectionhead">
              <h2>لماذا فيدة مختلفة؟</h2>
              <span className="muted">مبنية على Cloudflare Pages + Supabase</span>
            </div>
            <div className="cards four">
              <div className="card"><b>تشخيص → تكوين → فرصة → توريد</b><p className="muted">مسار واحد متكامل بدل تشتيت المنصات.</p></div>
              <div className="card"><b>توثيق بشري</b><p className="muted">لا دور يمنح لنفسه — مسؤول موثوق يهيئ users/profiles.</p></div>
              <div className="card"><b>أسعار DZD واضحة</b><p className="muted">integer/bigint — بلا غموض عملة.</p></div>
              <div className="card"><b>API جاهزة</b><p className="muted">/api/ai/assessment, /opportunities, /suppliers, /products, /talents</p></div>
            </div>
          </>
        )}

        {/* FORMATIONS */}
        {view === 'formations' && (
          <>
            <div className="sectionhead">
              <div>
                <h2>عروض التكوين النشطة</h2>
                <p className="intro">GET /api/formations — بيانات مثال فقط، استبدلها بعروض مدارس وفورماتورز موافقين عليها.</p>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {categories.map(c => (
                  <button key={c} className={filterCat === c ? 'primary' : 'outline'} style={{ padding: '8px 12px' }} onClick={() => setFilterCat(c)}>{c}</button>
                ))}
              </div>
            </div>
            <div className="cards">
              {(filterCat === 'الكل' ? formations : formations.filter(f => f.category === filterCat)).map(f => (
                <div key={f.id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                    <span className="pill">{f.category}</span>
                    {f.verified ? <span className="pill" style={{ borderColor: '#16a34a', color: '#86efac' }}>✓ موثق</span> : <span className="pill gold">قيد التوثيق</span>}
                  </div>
                  <h3 style={{ marginTop: 12 }}>{f.title}</h3>
                  <p className="muted">{f.provider} — {f.duration} — ⭐ {f.rating}</p>
                  <div className="price">{f.priceDZD.toLocaleString('fr-DZ')} DZD {f.oldPrice && <span style={{ textDecoration: 'line-through', color: '#64748b', fontSize: 13, marginRight: 8 }}>{f.oldPrice.toLocaleString('fr-DZ')} DZD</span>}</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="primary" style={{ flex: 1 }} onClick={() => showToast(`تم حفظ اهتمامك بـ ${f.title} — سيتواصل الفورماتور`)}>سجّل اهتمامك</button>
                    <button className="outline" onClick={() => showToast('عرض منهج التكوين — يتطلب ربط Supabase')}>المنهج</button>
                  </div>
                </div>
              ))}
            </div>
            { (filterCat !== 'الكل' && formations.filter(f => f.category === filterCat).length === 0) && <div className="empty">لا توجد تكوينات في هذا التصنيف حالياً.</div>}
          </>
        )}

        {/* OPPORTUNITIES */}
        {view === 'opportunities' && (
          <>
            <div className="sectionhead">
              <div>
                <h2>فرص المشاريع المفتوحة</h2>
                <p className="intro">GET /api/opportunities — لحسابات المستقل/الشركة بعد تسجيل الدخول.</p>
              </div>
              <button className="primary" onClick={() => showToast('نشر فرصة جديدة — يتطلب حساب شركة موثق')}>+ انشر فرصة</button>
            </div>
            <div className="stack">
              {opportunities.map(o => (
                <div key={o.id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span className="pill">{o.category}</span>
                        <span className={o.status === 'مفتوحة' ? 'pill' : 'pill gold'}>{o.status}</span>
                        <span className="muted">{o.location}</span>
                      </div>
                      <h3>{o.title}</h3>
                      <small className="muted">{o.company} — {o.applicants} متقدم</small>
                    </div>
                    <div style={{ textAlign: 'left', minWidth: 180 }}>
                      <div className="price" style={{ margin: 0 }}>{o.budget}</div>
                      <button className="primary" style={{ marginTop: 8, width: '100%' }} onClick={() => showToast(`تم التقديم على: ${o.title}`)}>قدّم الآن</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* SUPPLIERS */}
        {view === 'suppliers' && (
          <>
            <div className="sectionhead">
              <div>
                <h2>دليل الموردين الموثقين</h2>
                <p className="intro">GET /api/suppliers — لحساب شركة. الأسعار DZD integer/bigint. مثال كتالوج المورد أدناه.</p>
              </div>
              <span className="pill">إجمالي 4 موردين — 3 موثقين</span>
            </div>
            <div className="cards">
              {suppliers.map(s => (
                <div key={s.id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="pill">{s.category}</span>
                    {s.verified ? <span className="pill">✓ موثق</span> : <span className="pill gold">بانتظار التوثيق</span>}
                  </div>
                  <h3>{s.name}</h3>
                  <p className="muted">{s.location} — ⭐ {s.rating} — {s.productsCount} منتج</p>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <button className="primary" style={{ flex: 1 }} onClick={() => showToast(`طلب عرض سعر من ${s.name}`)}>اطلب عرض سعر</button>
                    <button className="outline" onClick={() => showToast('عرض الكتالوج الكامل — /api/products/:id')}>الكتالوج</button>
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ marginTop: 28 }}>كتالوج عينة — /api/products</h3>
            <div className="stack">
              {productsSample.map((p, i) => (
                <div key={i} className="listrow">
                  <div><strong>{p.name}</strong><small>متوفر: {p.stock} — توصيل وطني</small></div>
                  <div style={{ textAlign: 'left' }}>
                    <div className="price" style={{ margin: 0 }}>{p.price.toLocaleString('fr-DZ')} DZD</div>
                    <button className="link" onClick={() => showToast(`أضيف ${p.name} إلى سلة الطلب`)}>+ أضف للطلب</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* TALENTS */}
        {view === 'talents' && (
          <>
            <div className="sectionhead">
              <div>
                <h2>ملفات الفريلانسر الموثقة</h2>
                <p className="intro">GET /api/talents?category=... — مع فلترة حسب التخصص والتقييم.</p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="outline" onClick={() => showToast('تصفية متقدمة — قريباً')}>تصفية</button>
                <button className="primary" onClick={() => showToast('دعوة موهبة لمشروعك')}>ادعُ موهبة</button>
              </div>
            </div>
            <div className="cards">
              {talents.map(t => (
                <div key={t.id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="pill">{t.category}</span>
                    <span className={t.verified ? 'pill' : 'pill gold'}>{t.verified ? '✓ موثق' : 'غير موثق'}</span>
                  </div>
                  <h3>{t.name}</h3>
                  <p className="muted">{t.location} — {t.projects} مشروع مكتمل</p>
                  <div className="skill">
                    <span>نتيجة التقييم</span><span>{t.score}/100</span>
                    <div><i style={{ width: `${t.score}%` }} /></div>
                  </div>
                  <button className="primary" style={{ width: '100%' }} onClick={() => showToast(`تم إرسال طلب تواصل إلى ${t.name}`)}>تواصل</button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ASSESSMENT */}
        {view === 'assessment' && (
          <>
            <div className="sectionhead">
              <div>
                <div className="eyebrow">POST /api/ai/assessment — GPT-4o إرشادي</div>
                <h2>تشخيص مهاراتك في دقيقتين</h2>
                <p className="intro">قيّم نفسك من 0 إلى 10 في كل مهارة. أقل من 75 نقترح تكوينات، وعند 75+ نبحث عن فرص شركة مفتوحة مطابقة. التقييم ليس شهادة أو ضمان توظيف.</p>
              </div>
              <div className="year" style={{ minWidth: 120 }}><div style={{ fontSize: 42 }}>{score}</div><small>/ 100 — نتيجتك</small></div>
            </div>

            {!submitted ? (
              <div className="stack">
                {assessmentQuestions.map(q => (
                  <label key={q.id} style={{ display: 'grid', gap: 8 }}>
                    <span>{q.label} <small>— {q.category}</small></span>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <input
                        type="range" min={0} max={10} value={assessment[q.id] ?? 5}
                        onChange={e => handleAssess(q.id, parseInt(e.target.value))}
                        style={{ flex: 1 }}
                      />
                      <span className="pill" style={{ minWidth: 44, justifyContent: 'center' }}>{assessment[q.id] ?? 5}/10</span>
                    </div>
                  </label>
                ))}

                <div style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
                  <button
                    className="primary big"
                    disabled={Object.keys(assessment).length < 8}
                    onClick={() => setSubmitted(true)}
                  >
                    {Object.keys(assessment).length < 8 ? 'أجب على جميع الأسئلة أولاً' : 'اعرض نتيجتي وتوصياتي'}
                  </button>
                  <button className="outline big" onClick={() => { setAssessment({}); setSubmitted(false) }}>إعادة ضبط</button>
                </div>
                <p className="muted">سيتم حفظ سجل التقييم في جدول سجلات التقييم بعد ربط Supabase.</p>
              </div>
            ) : (
              <div className="result">
                <div className="card">
                  <div className="row">
                    <div>
                      <h3>نتيجتك الإجمالية</h3>
                      <p className="muted">بناءً على إجاباتك الإرشادية — مع مراجعة بشرية لاحقاً.</p>
                    </div>
                    <div className="score">{score}<small>/100</small></div>
                  </div>

                  <div style={{ marginTop: 18 }}>
                    {assessmentQuestions.map(q => {
                      const v = assessment[q.id] ?? 0
                      return (
                        <div key={q.id} className="skill">
                          <span>{q.label}</span><span>{v}/10</span>
                          <div><i style={{ width: `${v * 10}%`, background: v >= 7 ? '#0f766e' : v >= 5 ? '#f59e0b' : '#ef4444' }} /></div>
                        </div>
                      )
                    })}
                  </div>

                  {score < 75 ? (
                    <div className="banner" style={{ marginTop: 20, flexDirection: 'column', alignItems: 'stretch' }}>
                      <h3>نقترح لك مسار تكوين موثق</h3>
                      <p>نتيجتك تشير لحاجة لتعزيز بعض المهارات قبل المنافسة على فرص الشركات. اخترنا لك:</p>
                      <div className="cards" style={{ marginTop: 12 }}>
                        {formations.slice(0, 2).map(f => (
                          <div key={f.id} className="card">
                            <span className="pill">{f.category}</span>
                            <h3>{f.title}</h3>
                            <div className="price">{f.priceDZD.toLocaleString('fr-DZ')} DZD</div>
                            <button className="primary" style={{ width: '100%' }} onClick={() => showToast(`تم التسجيل في ${f.title}`)}>سجّل الآن</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="banner" style={{ marginTop: 20, flexDirection: 'column', alignItems: 'stretch' }}>
                      <h3>ممتاز — نبحث لك عن فرص مطابقة!</h3>
                      <p>نتيجتك تؤهلك لملف كفاءة. هذه فرص مفتوحة تناسب مهاراتك:</p>
                      <div className="stack" style={{ marginTop: 12 }}>
                        {opportunities.slice(0, 2).map(o => (
                          <div key={o.id} className="listrow">
                            <div><strong>{o.title}</strong><small>{o.company} — {o.budget}</small></div>
                            <button className="primary" onClick={() => showToast(`قدّمت على ${o.title}`)}>قدّم</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
                    <button className="outline" onClick={() => setSubmitted(false)}>عدّل إجاباتي</button>
                    <button className="primary" onClick={() => { setSubmitted(false); setView(score < 75 ? 'formations' : 'opportunities') }}>
                      {score < 75 ? 'استعرض كل التكوينات' : 'استعرض كل الفرص'}
                    </button>
                  </div>
                </div>

                <div className="card" style={{ marginTop: 14 }}>
                  <h3>احفظ نتيجتك وتابع التقدم</h3>
                  <p className="muted">أدخل بريدك لنرسل لك ملف كفاءة قابل للمشاركة (يتطلب تفعيل البريد في Supabase Auth).</p>
                  <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                    <input placeholder="بريدك@مثال.dz" value={email} onChange={e => setEmail(e.target.value)} style={{ flex: 1 }} />
                    <button className="primary" onClick={() => {
                      if (!email.includes('@')) return showToast('أدخل بريداً صحيحاً')
                      showToast(`تم حفظ النتيجة وإرسالها إلى ${email}`)
                      setEmail('')
                    }}>إرسال</button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer>
        <div>
          <b>فيدة | FEYDA</b> — شبكة جزائرية توصل الفريلانسر والتكوين والشركة والمورد.<br />
          <small>الأسعار بالدينار الجزائري. لا تجديد مدفوع تلقائي مفاجئ. المحتوى التوضيحي لا يغني عن المراجعة القانونية.</small>
        </div>
        <div style={{ textAlign: 'left' }}>
          <div>Cloudflare Pages → Build: <b>npm run build</b> — Output: <b>dist</b></div>
          <small>VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY كمتغيرات build — المفاتيح الخادمية في Secrets فقط.</small>
        </div>
      </footer>

      {toast && (
        <div style={{
          position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
          background: '#0f766e', color: '#f0fdf4', padding: '12px 20px', borderRadius: 4,
          border: '1px solid #115e59', maxWidth: 520, textAlign: 'center', zIndex: 999, boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
        }}>
          {toast}
        </div>
      )}
    </div>
  )
}
