export default function Card({title, link, img, desc}) {
    return (
        <div className="card">
          <a target="_blank" href={link}>
            <h2>{title}</h2>
            <img src={img}></img>
            <p>{desc}</p>
          </a>
        </div>
    );
}