type TCandidate = {
  id: number,
  city: string,
  experience: string,
  technologies: Array<{
    name: string,
    is_main_tech: boolean
  }>
}

interface ICardProps {
  candidate: TCandidate
}

const Card = ({ candidate }: ICardProps) => {
  let techs = candidate.technologies.map(tech => tech.name);

  return (
    <article data-testid="card" key={candidate.id} className="p-4 bg-white shadow radius">
      <p className="mb-2">
        <span className="block w-full font-bold">Cidade: </span> {candidate.city}
      </p>

      <p className="mb-2">
        <span className="block w-full font-bold">Experiencia: </span> {candidate.experience.replace('years', 'anos')}
      </p>

      <p className="mb-2 text-justify">
        <span className="block w-full font-bold">Competencias:</span> {techs.join(', ')}
      </p>
    </article>
  )
}

export default Card;