import Head from 'next/head';
import { useEffect, useState } from 'react';

import Select from 'components/select';
import Input from 'components/input';
import Submit from 'components/submit';
import Card from 'components/card';

import { client } from 'services/cliente';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [techs, setTechs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [formState, setFormState] = useState({
    city: undefined,
    techs: [],
    minExp: undefined,
    maxExp: undefined
  })

  /**
   * 
   * Change state if techs change
   * 
   */
  const handleChangeTechs = (val) => {
    const techValues = val.map(tech => tech.value);

    setFormState({
      ...formState,
      techs: techValues
    })
  }

  /**
   * 
   * Change state if city change
   * 
   */
  const handleChangeCity = (val) => setFormState({
    ...formState,
    city: val?.value || undefined
  })


  /**
   * 
   * Change state if inputs change
   * 
   */
  const handleChangeInput = (e, name) => setFormState({
    ...formState,
    [name]: e.target.value
  })


  /**
   * 
   * Search candidates
   * 
   */
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    let params = {};

    if (formState.city) params['city'] = formState.city;
    if (formState.techs.length > 0) params['techs'] = formState.techs.join(',');
    if (formState.minExp || formState.maxExp) params['exp'] = `${formState.minExp || 0}-${formState.maxExp || 100}`;

    const response = await client.get('/candidates/search', { params });

    if (response.data.candidates.length <= 0) {
      setCandidates([]);
      alert('Nenhum candidato encontrado com esses requisitos!');
    } else {
      setCandidates(response.data.candidates);
    }

    setLoading(false);
  }

  /**
   * 
   * Load data for selects
   * 
   */
  useEffect(() => {
    const getData = async () => {
      const cities = await client.get('/candidates/cities');
      const techs = await client.get('/candidates/techs');

      setCities(cities.data.map(city => ({ value: city, label: city })));
      setTechs(techs.data.map(tech => ({ value: tech, label: tech })));
    }

    getData();
  }, []);

  return (
    <main className="max-w-3xl w-full mx-auto p-4 md:p-0">
      <Head>
        <title>GeekHunter - Teste</title>
      </Head>

      <h1 className="text-2xl font-bold my-8">
        Encontre o candidato ideal
      </h1>

      <form onSubmit={e => handleSubmitForm(e)}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-8">
          <div className="w-full">
            <Select
              name="city"
              label="Cidade"
              options={cities}
              onChange={handleChangeCity}
            />
          </div>

          <div className="w-full">
            <Select
              name="techs"
              label="Competencias"
              options={techs}
              onChange={handleChangeTechs}
              isMulti
            />
          </div>

          <div className="w-full">
            <Input
              label="Experiencia minima"
              name="minExp"
              onChange={handleChangeInput}
              type="number"
            />
          </div>

          <div className="w-full">
            <Input
              label="Experiencia maxima"
              name="maxExp"
              onChange={handleChangeInput}
              type="number"
            />
          </div>
        </div>

        <Submit disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </Submit>
      </form>

      <section className="w-full py-8 space-y-4">
        {loading ?
          <p className="text-center">Carregando...</p>
          :
          <>
            {candidates.map(can => (
              <Card key={can.id} candidate={can} />
            ))}
          </>
        }
      </section>
    </main >
  )
}

export default Home;
