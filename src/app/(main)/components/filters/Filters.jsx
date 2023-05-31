"use client";
import { ListIcon, MinusIcon, PlusIcon, ReloadIcon } from '@/app/components/Icons';
import { useEffect, useState } from 'react';
import { useFilterContext } from '@/app/context/FilterContext';
import style from './filter.module.css';

const OpenButton = ({ index, open, setOpen }) => {
  const handleOpen = () => {
    setOpen(prevOpen => {
      const updatedOpen = [...prevOpen];
      updatedOpen[index] = { ...updatedOpen[index], isOpen: !updatedOpen[index].isOpen };
      return updatedOpen;
    });
  };

  return (
    <button onClick={handleOpen}>
      {open[index].isOpen ? (
        <MinusIcon bg="#000" width={20} height={20} />
      ) : (
        <PlusIcon bg="#000" width={20} height={20} />
      )}
    </button>
  );
};

const Checkbox = ({ i }) => {
  const { setParams, clearParam } = useFilterContext();

  return (
    <div className={style.item}>
      <input
        type="checkbox"
        className={style.checkbox}
        onClick={(e) =>
          e.target.checked
            ? setParams((params) => [...params, i.queryParams])
            : setParams((prevParams) => {
              const newParams = prevParams.filter((param) => param !== i.queryParams);
              return [newParams];
            })
        }
      />
      <p>{i.title}</p>
    </div>
  );
};

const Radio = ({ i }) => {
  const { setParams } = useFilterContext();

  return (
    <div className={style.item}>
      <input type="radio" />
      <p>{i.title}</p>
    </div>
  );
};

const Selection = ({ i }) => {
  const { setParams } = useFilterContext();

  return (
    <div className={style.item}>
      <select
        className={style.custom_select}
        onChange={(e) =>
          e.target.value !== null
            ? setParams((params) => {
              const newValue = params.filter(p => !p.includes(i.queryParams))
              return [...newValue, i.queryParams + e.target.value];
            })
            : setParams((params) => {
                const newValue = params.filter((p) => !p.includes(i.queryParams));
                return [...newValue];
              })
        }
      >
        {i.selectItems.map((sItems) => {
          return (
            <option key={sItems.title} value={sItems.value}>
              {sItems.title}
            </option>
          );
        })}
      </select>
    </div>
  );
}

const PriceRange = ({ s }) => {
  const items = s.items;
  const [prices, setPrices] = useState({
    from: 0,
    to: 0,
  })
  const { setParams } = useFilterContext();
  console.log(prices)

  return (
    <div>
      <div className={style.item}>
        <div className={style.price_input}>
          <label>$</label>
          <input type="number" placeholder="Desde" onChange={(e) => setPrices(prices => {
            return { ...prices, from: e.target.value }
          })}/>
        </div>
        <div className={style.price_input}>
          <label>$</label>
          <input type="number" placeholder="Hasta" onChange={(e) => setPrices(prices => {
            return { ...prices, to: e.target.value }
          })}/>
        </div>
      </div>
      <button
        onClick={() => {
          if (prices.to > 0) {
            setParams((params) => {
              const newValue = params.filter(p => !p.includes(items[1].queryParams))
              return [...newValue, items[1].queryParams + prices.to];
            })
          }
          if (prices.from > 0) {
            setParams((params) => {
              const newValue = params.filter(p => !p.includes(items[0].queryParams))
              return [...newValue, items[0].queryParams + prices.from];
            })
          }
          if (prices.from === 0) {
            setParams((params) => {
              const newValue = params.filter((p) => p !== items[0].queryParams + prices.from);
              return [...newValue];
            })
          }
          if (prices.to === 0) {
            setParams((params) => {
              const newValue = params.filter((p) => p !== items[1].queryParams + prices.to);
              return [...newValue];
            })
          }
        }}
        style={{
          background: "#000",
          border: "none",
          height: 40,
          padding: 5,
          marginTop: 10,
          width: "100%",
          fontSize: 16,
          borderRadius: 5,
          color: "#fff",
        }}
      >
        Aplicar
      </button>
    </div>
  );
}

export default function Filters({ sections }) {
  const [open, setOpen] = useState(sections.map((s, index) => ({
    name: s.title,
    isOpen: index < 2 ? true : false
  })));
  const [openFilter, setOpenFilter] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
  });
  const { setParams } = useFilterContext();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setCurrentWidth(document.body.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (typeof document !== 'undefined') {
        setCurrentWidth(document.body.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const SECTIONSTYPE = {
    checkbox: "checkbox",
    radio: "radio",
    price: "price",
    select: "select",
    subtitle: "subtitle"
  }

  return (
    <div className={style.container}>
      <button
        className={style.res_open_button}
        onClick={() => setOpenFilter((filter) => !filter)}
      >
        <ListIcon bg="#000" width={20} height={20} />
        <span>Filtros</span>
      </button>
      <div
        className={style.subcontainer}
        style={
          currentWidth <= 1100
            ? openFilter
              ? { display: "flex" }
              : { display: "none" }
            : { display: "flex" }
        }
      >
        <div className={style.title_container}>
          <div className={style.title}>
            <ListIcon bg="#000" width={20} height={20} />
            <p>Filtros</p>
          </div>
        </div>
        <div className={style.separatorOne}>
          <div className="separator"></div>
        </div>
        {sections.map((s, index) => {
          return (
            <div>
              <div key={s.title} className={style.section}>
                <div className={style.section_title}>
                  <p>{s.title}</p>
                  <OpenButton index={index} open={open} setOpen={setOpen} />
                </div>
                <div
                  className={style.section_items}
                  style={
                    open[index].isOpen
                      ? { display: "flex" }
                      : { display: "none" }
                  }
                >
                  {s.items.map((i) => {
                    if (i.type == SECTIONSTYPE.checkbox)
                      return <Checkbox i={i} setParams={setParams} />;
                    if (i.type == SECTIONSTYPE.checkbox)
                      return <Radio i={i} setParams={setParams} />;
                    if (i.type == SECTIONSTYPE.select)
                      return <Selection i={i} setParams={setParams} />;
                    if (i.type == SECTIONSTYPE.price)
                      return <PriceRange s={i}/>
                    if (i.type == SECTIONSTYPE.subtitle)
                      return (
                        <div className={style.item}>
                          <p className={style.sub_item_title}>{i.title}</p>
                          <div className={style.sub_item_container}>
                            {i.items.map((i) => {
                              return <Checkbox i={i} key={i.queryParams} />;
                            })}
                          </div>
                        </div>
                      );
                  })}
                </div>
              </div>
              <div className="separator"></div>
            </div>
          );
        })}
        <div className={style.button}>
          <button onClick={() => setParams([])}>
            <ReloadIcon bg="#000" width={18} height={18} />
            <span>Reiniciar filtros</span>
          </button>
        </div>
      </div>
    </div>
  );
}
