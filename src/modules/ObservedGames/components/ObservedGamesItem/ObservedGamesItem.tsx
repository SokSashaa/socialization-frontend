import { ItemListWrapper } from '../../../../UI';
import { defaultGameIcon } from '../../../../assets';
import styles from './ObservedGamesItem.module.scss';

const ObservedGamesItem = ({ game }) => (
  <ItemListWrapper>
    <div className={styles.info}>
      <img
        src={game.icon === undefined ? defaultGameIcon : game.icon}
        alt="default game icon"
      />
      <div className={styles.gameTextInfo}>
        <h3 className={styles.title}>{game.name}</h3>
        <p className={styles.description}>{game.description}</p>
      </div>
    </div>
  </ItemListWrapper>
);

export default ObservedGamesItem;
