import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { AccordionContent } from "./AccordionContent";
import '../../shared/css/main.css'

const Accordion = ({ i, expanded, setExpanded, data, name}) => {
  const isOpen = i === expanded;
  return (
    <>
      <motion.header
        initial={false}
        animate={{ backgroundColor: isOpen ? "#fff" : "#fff" }}
        onClick={() => setExpanded(isOpen ? false : i)}
        className="acc-header"
        >
        {name}
     </motion.header>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.section
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              className="acc-section"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 }
              }}
              transition={{ duration: 0.4, ease: [0.04, 0.32, 0.23, 0.98] }}
            >
              <AccordionContent props={data} />
            </motion.section>
          )}
        </AnimatePresence>
    </>
  );
};
export const ThisAccordion = (props) => {
    const [expanded, setExpanded] = useState(false);
    const accs = props.data.map((set,i) => (<Accordion key={set.name} expanded={expanded} setExpanded={setExpanded} i={i} name={set.name} data={set.data} />))
    return accs


}
