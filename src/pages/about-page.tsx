import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { PageMeta } from '@/components/page-meta'
import { Section } from '@/components/section'
import { fadeUp, staggerContainer, viewport } from '@/lib/motion'
import { processSteps, reasonsToChooseUs, valuePillars } from '@/lib/site-config'

export function AboutPage() {
  return (
    <>
      <PageMeta
        title="Om oss"
        description="Lär känna Webbekonomi & Webbdesign AB och hur vi kombinerar ekonomi, webbutveckling och design i en affärsmässig helhet."
      />
      <PageHeader
        eyebrow="Om oss"
        title="Vi bygger lugn, riktning och digital tydlighet för moderna företag."
        description="Webbekonomi & Webbdesign AB är byggt för företag som vill ha en partner med både affärsperspektiv och teknisk förståelse. Målet är att skapa en stabil grund som känns professionell direkt och går att vidareutveckla över tid."
        chips={['Vision', 'Arbetssätt', 'Förtroende']}
      />

      <Section
        eyebrow="Vår riktning"
        title="Vi tror på tydliga lösningar som gör vardagen enklare och företaget starkare."
        description="Det ska vara lätt att förstå vad som levereras, varför det spelar roll och hur nästa steg ser ut. Därför bygger vi både design och struktur med samma noggrannhet."
      >
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="surface-panel p-6 sm:p-8"
          >
            <h3 className="text-3xl leading-tight">
              En partner för företag som vill utvecklas utan att tappa kontrollen.
            </h3>
            <p className="mt-4 text-base leading-7">
              Vi vet att företag sällan har tid för onödig komplexitet. Därför
              arbetar vi med tydlig struktur, rak kommunikation och lösningar som
              känns relevanta för verksamheten, inte bara för tekniken.
            </p>
            <p className="mt-4 text-base leading-7">
              När ekonomi, webb och design samordnas uppstår färre glapp mellan
              strategi och utförande. Det ger bättre beslutsunderlag internt och
              en mer förtroendeingivande upplevelse externt.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid gap-4"
          >
            {valuePillars.map(({ description, icon: Icon, title }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="surface-panel flex gap-4 p-6"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="text-2xl">{title}</h3>
                  <p className="mt-2 text-sm leading-7">{description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      <Section
        eyebrow="Arbetssätt"
        title="Så bygger vi projekt som känns tydliga från start."
        description="En enkel arbetsmodell gör det lättare att hålla fokus, fatta beslut och skapa leveranser som går att lita på."
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {processSteps.map(({ description, icon: Icon, title }) => (
            <motion.article
              key={title}
              variants={fadeUp}
              className="surface-panel p-6"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-5 text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-7">{description}</p>
            </motion.article>
          ))}
        </motion.div>
      </Section>

      <Section
        eyebrow="Varför välja oss"
        title="En professionell bas som går att bygga vidare på."
        description="Vi prioriterar inte bara det snygga eller det tekniska var för sig, utan hur allt samspelar när företaget ska växa."
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid gap-4 md:grid-cols-2"
        >
          {reasonsToChooseUs.map(({ description, icon: Icon, title }) => (
            <motion.article
              key={title}
              variants={fadeUp}
              className="surface-panel flex gap-4 p-6"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <Icon className="size-5" />
              </div>
              <div>
                <h3 className="text-2xl">{title}</h3>
                <p className="mt-2 text-sm leading-7">{description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Section>
    </>
  )
}
